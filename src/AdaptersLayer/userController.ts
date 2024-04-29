import {Req, Res, Next, } from "../infrastructureLayer/types/serverPackageTypes";
import { UserUseCase } from "../usecasesLayer/useCases/userUseCase";
import { validateEmail, validatePassword, validateUsername, } from "./middlewares/inputValidation";
import { accessTokenOptions, refreshTokenOptions, } from "./middlewares/tokenOptions";

export class UserController {
  private userUseCase: UserUseCase;

  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }

  async registerUser(req: Req, res: Res, next: Next) {
    try {
      // input validation
      const { username, email, password } = req.body;

      const validationErrors: string[] = [];

      if (!validateUsername(username))
        validationErrors.push("Invalid username format");

      if (!validateEmail(email)) validationErrors.push("Invalid email format");

      if (!validatePassword(password))
        validationErrors.push("Invalid password format");

      if (validationErrors.length > 0) return next(validationErrors);

      const token = await this.userUseCase.registerUser(req.body, next);

      if (!token)
        return res.status(400)
          .json({ success: false, message: "No verification token found" });

      res.cookie("verficationToken", token, {
        httpOnly: true,
        sameSite: "none",
        // domain: 'https://frontend-docker-test.vercel.app',
        // path: '/',
        expires: new Date(Date.now() + 30 * 60 * 1000),
        secure: true
      });

      
      

      res.status(200).json({
          success: true,
          message: "verification otp has been send to the mail",
        });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async createUser(req: Req, res: Res, next: Next) {
    try {
      
      console.log('-------',req.cookies.verficationToken)

      let token = req.cookies.verficationToken;
      console.log('reaced here')
      console.log(token)

      if (!token)
        return res.status(400).json({
          success: false, message: "No verification token found" 
        });

      const result = await this.userUseCase.createUser(
        req.body.otp,
        token,
        next
      );

      if (result) res.clearCookie("verificationToken").status(200).send(result);
      else res.status(401).json({ message: "otp mismatch" });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;

      const validationErrors: string[] = [];

      if (!validateEmail(email)) validationErrors.push("Invalid email format");

      if (!validatePassword(password))
        validationErrors.push("Invalid password format");

      const result = await this.userUseCase.login(req.body, next);

      res.cookie("accessToken", result?.tokens.accessToken, accessTokenOptions);
      res.cookie(
        "refreshToken",
        result?.tokens.accessToken,
        refreshTokenOptions
      );

      res.status(200).json(result?.user);
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async logout (req: Req, res: Res, next: Next) {
    try {
      await this.userUseCase.logout(req, res, next)
      res.status(200).json({ success: true, message: "User has been logged out successfully!"})
    } catch (error: unknown | never) {
      throw error
    }
  }

  async generateUploadURL(req: Req, res: Res, next: Next) {
    try {
      const url = await this.userUseCase.generateUploadURL(next);
      res.status(200).json({ uploadURL: url });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async createBlog(req: Req, res: Res, next: Next) {
    try {
      let { title, des, banner, tags, author, content, draft } = req.body;
      function generateRandomNumber() {
        const min = 100000000; // Minimum 9-digit number
        const max = 999999999; // Maximum 9-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      if (!title.length)
        return res
          .status(403)
          .json({ error: "You must provide a title to publish the blog" });

      if (!des.length || des.length > 200)
        return res
          .status(403)
          .json({
            error: "You must provide blog description under 200 characters",
          });

      if (!banner.length)
        return res
          .status(403)
          .json({ error: "You must provide banner for this blog" });

      if (!content.blocks.length)
        return res
          .status(403)
          .json({ error: "You must provide a blog content before publish it" });

      if (!tags.length || tags.length > 10)
        return res
          .status(403)
          .json({
            error:
              "You must provide tags in order to publish the blog, Maximum 10",
          });

      tags = tags.map((tag: string) => tag.toLowerCase());

      let blog_id =
        title
          .replace(/[^a-zA-Z0-9]/g, " ")
          .replace(/\s+/g, "-")
          .trim() + generateRandomNumber();

      const response = await this.userUseCase.createBlog(
        title,
        des,
        banner,
        content,
        tags,
        author,
        blog_id,
        Boolean(draft),
        next
      );

      res.status(200).json(response);
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async latestBlog(page: number, req: Req, res: Res, next: Next) {
    try {
      const page = Number(req.query.page) || 1;
      const response = await this.userUseCase.latestBlog(page, next);
      if (response.length === 0)
        return res.status(400).json({ response: null });
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async trendingBlog(req: Req, res: Res, next: Next) {
    try {
      const response = await this.userUseCase.trendingBlog(next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async exploreTags(req: Req, res: Res, next: Next) {
    try {
      const response = await this.userUseCase.exploreTags(next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async filterByTags(req: Req, res: Res, next: Next) {
    try {
      let tag = req.body.tag.tag;
      const response = await this.userUseCase.filterByTags(tag, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async search(req: Req, res: Res, next: Next) {
    try {
      const query: string = req.query.query as string;
      const response = await this.userUseCase.searchByQuery(query, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async getProfile(req: Req, res: Res, next: Next) {
    try {
      const userId = Object.keys(req.body)[0];
      const response = await this.userUseCase.getProfile(userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async fetchUserBlogs(req: Req, res: Res, next: Next) {
    try {
      const userId: string = req.query.query as string;
      const response = await this.userUseCase.fetchUserBlogs(userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async fetchSingleBlog(req: Req, res: Res, next: Next) {
    try {
      const blog_id: string = req.query.query as string;
      const response = await this.userUseCase.fetchSingleBlog(blog_id, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async fetchSimilarBlogs(req: Req, res: Res, next: Next) {
    try {
      const tags = req.body;
      const response = await this.userUseCase.fetchSimilarBlogs(tags, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async increaseReadCount(req: Req, res: Res, next: Next) {
    try {
      const { userId, blogId } = req.body;
      const response = await this.userUseCase.increaseReadCount(
        userId,
        blogId,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async followUser(req: Req, res: Res, next: Next) {
    try {
      const { authorId, userId } = req.body;
      const response = await this.userUseCase.followUser(
        authorId,
        userId,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async unfollowUser(req: Req, res: Res, next: Next) {
    try {
      const { authorId, userId } = req.body;
      const response = await this.userUseCase.unfollowUser(
        authorId,
        userId,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async likeBlog(req: Req, res: Res, next: Next) {
    try {
      const { blogId, userId } = req.body;
      const response = await this.userUseCase.likeBlog(blogId, userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async unLikeBlog(req: Req, res: Res, next: Next) {
    try {
      const { blogId, userId } = req.body;
      const response = await this.userUseCase.unLikeBlog(blogId, userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async initialLike(req: Req, res: Res, next: Next) {
    try {
      const userId = req.query.userId as string;
      const blogId = req.query.blogId as string;
      const response = await this.userUseCase.initialLike(userId, blogId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async saveBlog(req: Req, res: Res, next: Next) {
    try {
      const { blogId, userId } = req.body;
      const response = await this.userUseCase.saveBlog(blogId, userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async unSaveBlog(req: Req, res: Res, next: Next) {
    try {
      const { blogId, userId } = req.body;
      const response = await this.userUseCase.unSaveBlog(blogId, userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async savedBlogs(req: Req, res: Res, next: Next) {
    try {
      const userId = req.query.userId as string;
      const response = await this.userUseCase.savedBlogs(userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async listFollowers(req: Req, res: Res, next: Next) {
    try {
      const userId = req.query.userId as string;
      const response = await this.userUseCase.listFollowers(userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async listFollowings(req: Req, res: Res, next: Next) {
    try {
      const userId = req.query.userId as string;
      const response = await this.userUseCase.listFollowings(userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async addComment(req: Req, res: Res, next: Next) {
    try {
      const { commentData, comment } = req.body;

      if (!comment.length)
        return res
          .status(403)
          .json({ error: "Write something to leave a comment!" });

      const response = await this.userUseCase.addComment(
        commentData,
        comment,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async initialComments(req: Req, res: Res, next: Next) {
    try {
      const blogId = req.query.blogId as string;
      const response = await this.userUseCase.initialComments(blogId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async addReplyComment(req: Req, res: Res, next: Next) {
    try {
      const { comment, parentCommentId, commentData } = req.body;
      const response = await this.userUseCase.addReplyComment(
        comment,
        parentCommentId,
        commentData,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async reportBlog(req: Req, res: Res, next: Next) {
    try {
      const { blog_id, reason, reportedBy } = req.body;
      const response = await this.userUseCase.reportBlog(
        blog_id,
        reason,
        reportedBy,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async checkIsSubscribed(req: Req, res: Res, next: Next) {
    try {
      const userId = Object.keys(req.body)[0];
      const response = await this.userUseCase.checkIsSubscribed(userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async monthlySubscription(req: Req, res: Res, next: Next) {
    try {
      const { userId, subscriptionType } = req.body;
      const response = await this.userUseCase.monthlySubscription(
        userId,
        subscriptionType,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async annualSubscription(req: Req, res: Res, next: Next) {
    try {
      const { userId, subscriptionType } = req.body;
      const response = await this.userUseCase.annuallySubscription(
        userId,
        subscriptionType,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async webhook(req: Req, res: Res, next: Next) {
    try {
      const body = req.body;
      const sig = req.headers["stripe-signature"];
      const response = await this.userUseCase.webhook(body, sig, next);
      const status = response.status;
      if (
        response.wbhook.paymentMethod &&
        response.wbhook.userId &&
        response.wbhook.receipt_url &&
        response.wbhook.subscriptionType
      ) {
        const paymentMethod = response.wbhook.paymentMethod;
        const userId = response.wbhook.userId;
        const receipt_url = response.wbhook.receipt_url;
        const subscriptionType = response.wbhook.subscriptionType;
        return await this.userUseCase.savingPaymentData(
          paymentMethod,
          userId,
          receipt_url,
          subscriptionType,
          next
        );
      }
      return res.status(200).json({ status });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async reciptUrl(req: Req, res: Res, next: Next) {
    try {
      const userId = req.query.userId as string;
      const response = await this.userUseCase.reciptUrl(userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async fetchAllUsers(req: Req, res: Res, next: Next) {
    try {
      const response = await this.userUseCase.fetchAllUsers(next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async sendChat(req: Req, res: Res, next: Next) {
    try {
      const data = req.body;
      const response = await this.userUseCase.sendChat(data, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async getChat(req: Req, res: Res, next: Next) {
    try {
      if (req.query.receiverId == null) return;
      const senderId = req.query.senderId as string;
      const receiverId = req.query.receiverId as string;
      const response = await this.userUseCase.getChat(
        senderId,
        receiverId,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async registerNotificationToken(req: Req, res: Res, next: Next) {
    try {
      const token = req.body.token;
      const userId = req.body.userId;
      const response = await this.userUseCase.registerNotificationToken(
        token,
        userId,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async fetchAllUserNotification(req: Req, res: Res, next: Next) {
    try {
      const userId = req.query.userId as string;
      const response = await this.userUseCase.fetchAllUserNotification(
        userId,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async notificationSeen(req: Req, res: Res, next: Next) {
    try {
      const notificationId = req.body.notificationId;
      const response = await this.userUseCase.notificationSeen(
        notificationId,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async notificationCount(req: Req, res: Res, next: Next) {
    try {
      const userId = req.query.userId as string;
      const response = await this.userUseCase.notificationCount(userId, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async chatUserSearch(req: Req, res: Res, next: Next) {
    try {
      const query = req.query.searchText as string;
      const response = await this.userUseCase.chatUserSearch(query, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async editUserProfile(req: Req, res: Res, next: Next) {
    const { personal_info, social_links, uploaded_image, userId } = req.body;
    const { username, email } = personal_info;

    // Validate username and email
    if (!validateUsername(username))
      return res.status(400).json({ error: "Invalid username format" });

    if (!validateEmail(email))
      return res.status(400).json({ error: "Invalid email format" });

    try {
      const response = await this.userUseCase.editUserProfile(
        personal_info,
        social_links,
        uploaded_image,
        userId,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async changePassword(req: Req, res: Res, next: Next) {
    const { newPassword, confirmPassword, userId } = req.body;

    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .json({ error: "New Password and Confirm password is not match" });

    if (!validatePassword(newPassword))
      return res.status(400).json({ error: "Invalid password format" });

    try {
      const response = await this.userUseCase.changePassword(
        userId,
        newPassword,
        next
      );
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async forgotPasswordEmail(req: Req, res: Res, next: Next) {
    try {
      const email = req.body.email;
      const response = await this.userUseCase.forgotPasswordEmail(email, next);

      res.cookie("email", email, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });

      return res.status(200).json(response);
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async forgotPasswordOtp(req: Req, res: Res, next: Next) {
    try {
      const otp = req.body.otp;
      const email = req.cookies.email;
      if (!email)
        return res
          .status(400)
          .clearCookie("email")
          .json({ success: false, message: "No verification token found" });

      const response = await this.userUseCase.forgotPasswordOtp(
        otp,
        email,
        next
      );

      if (response.status === true)
        return res.status(200).json({ message: response.message });
      if (response.status === false) {
        res
          .status(401)
          .clearCookie("email")
          .json({ message: response.message });
      }
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async changePasswordNotLoggedIn(req: Req, res: Res, next: Next) {
    const email = req.cookies.email;
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .json({ error: "New Password and Confirm password is not match" });
    if (!validatePassword(newPassword))
      return res.status(400).json({ error: "Invalid password format" });
    try {
      const response = await this.userUseCase.changePasswordNotLoggedIn(
        email,
        newPassword,
        next
      );
      return res.status(200).clearCookie("email").json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async resendOtp(req: Req, res: Res, next: Next) {
    try {
      let token = req.cookies.verficationToken;
      if (!token)
        return res
          .status(400)
          .json({ success: false, message: "No verification token found" });

      const response = await this.userUseCase.resendOtp(token, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }

  async googleAuth(req: Req, res: Res, next: Next) {
    try {
      const uid = req.body.uid;
      const response = await this.userUseCase.googleAuth(uid, next);
      return res.status(200).json({ response });
    } catch (error: unknown | never) {
      throw error;
    }
  }
}
