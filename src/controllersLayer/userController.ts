import { Req, Res, Next } from "../infrastructureLayer/types/serverPackageTypes";
import { UserUseCase } from "../usecasesLayer/useCases/userUseCase";
import { validateEmail, validatePassword, validateUsername } from "./middlewares/inputValidation";
import { ErrorHandler } from "../usecasesLayer/middlewares/errorHandler";
import { accessTokenOptions, refreshTokenOptions } from "./middlewares/tokenOptions";



export class UserController {
    private userUseCase: UserUseCase;

    constructor(userUseCase: UserUseCase){
        this.userUseCase = userUseCase;
    }

    async registerUser(req: Req, res: Res, next: Next) {
        console.log('reached inside the registerUser in userController')
        try {
            // input validation
            const { username, email, password } = req.body;
            console.log('body -- > ', req.body)
            const validationErrors: string[] = [];
            
            if (!validateUsername(username)) {
                
                validationErrors.push("Invalid username format");
            }
            if (!validateEmail(email)) {
                validationErrors.push("Invalid email format");
            }
            if (!validatePassword(password)) {
                validationErrors.push("Invalid password format");
            }

            if (validationErrors.length > 0) {
                return next(validationErrors);
            }


            const token = await this.userUseCase.registerUser(req.body, next)

            console.log('<-------------------------- token in userController ------------------------>')
            console.log( token)
            console.log('<--------------------------------------------------- ------------------------>')

           
            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: "No verification token found"
                });
            }


            res.cookie("verficationToken", token, {
                httpOnly: true,
                sameSite: "strict",
                expires: new Date(Date.now() + 30*60*1000)
            })

            res.status(200).json({
                success: true,
                message: "verification otp has been send to the mail"
            })

        } catch (error: unknown | never) {
            throw error
            // return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    async createUser(req: Req, res: Res, next: Next) {
        try {
                //   console.log('request incomming --->>> ', req)
            let token = req.cookies.verficationToken;
            console.log('token in the userController ----- > ', token)
            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: "No verification token found"
                });
            }
            const result = await this.userUseCase.createUser(
                req.body.otp,
                token,
                next
            );
                console.log('result in the userController ------>>>>>>> ', result)
            if (result) res.clearCookie("verificationToken").send(result)
            else res.status(401).json({message: 'otp mismatch'})
        } catch (error: unknown | never) {
            throw error
            // return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', ));
        }
    }


    async login(req: Req, res: Res, next: Next) {
        try {
            const { email, password } = req.body;

            console.log('body -- > ', req.body)

            const validationErrors: string[] = [];

            if (!validateEmail(email)) {
                validationErrors.push("Invalid email format");
            }
            if (!validatePassword(password)) {
                validationErrors.push("Invalid password format");
            }

            const result = await this.userUseCase.login(req.body, next)
            console.log('result from usecsae login -->> ',result)

            res.cookie('accessToken', result?.tokens.accessToken, accessTokenOptions);
            res.cookie('refreshToken', result?.tokens.accessToken, refreshTokenOptions)

            res.status(200).json(result?.user)

        } catch (error: unknown | never) {
            throw error
            // return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', ));
        }
    }


    async generateUploadURL(req: Req, res: Res, next: Next) {
        try {
            const url = await this.userUseCase.generateUploadURL(next)

            res.status(200).json({ uploadURL: url})
        } catch (error: unknown | never) {
            throw error
        }
    }

    async createBlog(req: Req, res: Res, next: Next) {
        try {
            let {title, des, banner, tags, author, content, draft } = req.body;
            function generateRandomNumber() {
                const min = 100000000; // Minimum 9-digit number
                const max = 999999999; // Maximum 9-digit number
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            if(!title.length) {
                return res.status(403).json({ error: 'You must provide a title to publish the blog' })
            }
            if (!des.length || des.length > 200) {
                return res.status(403).json({ error: 'You must provide blog description under 200 characters' })
            }
            if (!banner.length) {
                return res.status(403).json({ error: 'You must provide banner for this blog' })
            }
            if (!content.blocks.length) {
                return res.status(403).json({ error: 'You must provide a blog content before publish it' })
            }
            if (!tags.length || tags.length > 10) {
                return res.status(403).json({ error: 'You must provide tags in order to publish the blog, Maximum 10' })
            }

            tags = tags.map((tag: string) => tag.toLowerCase())

            let blog_id = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, '-').trim() + generateRandomNumber() 
            console.log('blog id -->> ',typeof blog_id)
            const response = await this.userUseCase.createBlog(title, des, banner, content, tags, author, blog_id, Boolean(draft), next)
            console.log('response -->> ', response)
            res.status(200).json(response)
            // return response
        } catch (error: unknown | never) {
            throw error
        }
    }

    async latestBlog(page: number, req: Req, res: Res, next: Next) {
        try {
            const page = req.query.page || 1;
            const response = await this.userUseCase.latestBlog(page, next)
            console.log('response in controller -->>> ',response)
            if (response.length === 0) return res.status(400).json( { response: null})
            return res.status(200).json({ response})
        } catch (error: unknown | never) {
            throw error
        }
    }

    async trendingBlog(req: Req, res: Res, next: Next) {
        try {
            const response = await this.userUseCase.trendingBlog(next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async exploreTags (req: Req, res: Res, next: Next) {
        try {
            const response = await this.userUseCase.exploreTags(next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async filterByTags (req: Req, res: Res, next: Next) {
        try {
            let tag  = req.body.tag
            const response = await this.userUseCase.filterByTags(tag, next)
            return res.status(200).json({ response})
        } catch (error: unknown | never) {
            throw error
        }
    }

    async search (req: Req, res: Res, next: Next) {
        try {
            const query: string = req.query.query as string;
            console.log('query -->> ',query )
            const response = await this.userUseCase.searchByQuery(query, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async getProfile(req: Req, res: Res, next: Next) {
        try {            
            const userId = Object.keys(req.body)[0]
            console.log(userId)
            const response = await this.userUseCase.getProfile(userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async fetchUserBlogs(req: Req, res: Res, next: Next){
        try {
            const userId: string = req.query.query as string;
            console.log(userId)
            const response = await this.userUseCase.fetchUserBlogs(userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async fetchSingleBlog (req: Req, res: Res, next: Next) {
        try {
            const blog_id : string = req.query.query as string;
            console.log('blog_id ',blog_id)
            const response = await this.userUseCase.fetchSingleBlog(blog_id, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async fetchSimilarBlogs (req: Req, res: Res, next: Next) {
        try {
            const tags = req.body
            console.log('tags', tags)
            const response = await this.userUseCase.fetchSimilarBlogs(tags, next)
            return res.status(200).json({ response})
        } catch (error: unknown | never) {
            throw error
        }
    }

    async increaseReadCount (req: Req, res: Res, next: Next) {
        try {
            const {userId, blogId} = req.body
            console.log(userId, ';;;;', blogId)
            const response = await this.userUseCase.increaseReadCount(userId, blogId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async followUser (req: Req, res: Res, next: Next) {
        try {
            const { authorId, userId } = req.body
            console.log(authorId,'<......>', userId)
            const response = await this.userUseCase.followUser(authorId, userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async unfollowUser(req: Req, res: Res, next: Next) {
        try {
            const { authorId, userId } = req.body
            const response = await this.userUseCase.unfollowUser(authorId, userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async likeBlog(req: Req, res: Res, next: Next) {
        try {
            const { blogId, userId } = req.body
            const response = await this.userUseCase.likeBlog(blogId, userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async unLikeBlog(req: Req, res: Res, next: Next) {
        try {
            const { blogId , userId } = req.body
            const response = await this.userUseCase.unLikeBlog(blogId, userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async initialLike (req: Req, res: Res, next: Next) {
        try {
            console.log('req.query >>>>>>>>>>>>>>>> ',req.query.userId, req.query.blogId)
            const userId = req.query.userId as string;
            const blogId = req.query.blogId as string;
            const response = await this.userUseCase.initialLike(userId, blogId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async saveBlog(req: Req, res: Res, next: Next) {
        try{
            const { blogId, userId } = req.body;
            const response = await this.userUseCase.saveBlog(blogId, userId, next)
            console.log('final response -->> ',response)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async unSaveBlog(req: Req, res: Res, next: Next) {
        try {
            const { blogId, userId } = req.body;
            const response = await this.userUseCase.unSaveBlog(blogId, userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async savedBlogs(req: Req, res: Res, next: Next) {
        try {
            const userId = req.query.userId as string;
            const response = await this.userUseCase.savedBlogs(userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async listFollowers(req: Req, res: Res, next: Next) {
        try {
            const userId = req.query.userId as string;
            const response = await this.userUseCase.listFollowers(userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }

    async listFollowings(req: Req, res: Res, next: Next) {
        try {
            const userId = req.query.userId as string;
            const response = await this.userUseCase.listFollowings(userId, next)
            return res.status(200).json({ response })
        } catch (error: unknown | never) {
            throw error
        }
    }
}