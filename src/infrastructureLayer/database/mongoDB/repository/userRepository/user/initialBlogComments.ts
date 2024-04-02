
import { IBlog } from "../../../../../../entitiesLayer/blog";
import IComment from "../../../../../../entitiesLayer/comments";
import BlogModel from "../../../models/blogModel";

interface CommentDetails {
    _id: string;
    text: string;
    commenter: {
        _id: string;
        name: string;
    };
    createdAt: Date;
}

export const initialBlogComments = async (
    blogId: string,
    blogModel: typeof BlogModel,
   
): Promise<any | void> => {
    try {
        const blog= await blogModel.findById(blogId);

        if (!blog) {
            throw new Error('Blog not found');
        }

        // Populate the 'comments' field of the blog with comment details
        const blogComments =  await blog.populate({
            path: 'comments',
            select: 'comment commented_by commentedAt isReply',
            populate: {
                path: 'commented_by',
                select: 'personal_info.username'
            }
        });

        // Extract and format the comment details
        console.log('initial comments --- ',blogComments.comments)

        if (blogComments.comments) {

            const filteredComments: IComment[] = blogComments.comments.filter((comment: IComment) => comment.isReply === false);
            
            const formattedComments: any[] = filteredComments.map((comment: IComment) => ({
                commentID: comment._id,
                commentedUser: {
                    id: comment.commented_by._id,
                    username: comment.commented_by.personal_info.username
                },
                comment: comment.comment,
                commentTime: comment.commentedAt.toISOString() // Convert date to string
            }));
            console.log('formattedComments ', formattedComments)

            formattedComments.sort((a, b) => new Date(b.commentTime).getTime() - new Date(a.commentTime).getTime());

            return formattedComments
        } else {
            return null
        }
        
        
       
        
    } catch (error) {
        throw error
    }
}