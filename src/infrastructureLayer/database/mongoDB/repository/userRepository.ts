import IUser from "../../../../entitiesLayer/user";
import { IUserRepository } from "../../../../usecasesLayer/interface/repository/IuserRepository";
import UserModel from "../models/userModel";
import BlogModel from "../models/blogModel";
import CommentModel from "../models/commentModel";

import { CreateBlog, createUser, findUserByEmail } from "./userRepository/user";
import { NextFunction } from "express";
import { latestBlogs } from "./userRepository/user/latestBlogs";
import { trendingBlog } from "./userRepository/user/trendingBlog";
import { fetchAllTags } from "./userRepository/user/fetchAllTags";
import { filteredByTag } from "./userRepository/user/filteredByTag";
import { searchByQuery } from "./userRepository/user/searchByQuery";
import { getUserProfile } from "./userRepository/user/getUserProfile";
import { fetchUserBlog } from "./userRepository/user/fetchUserBlog";
import { fetchBlog } from "./userRepository/user/fetchBlog";
import { fetchSimilarBlog } from "./userRepository/user/fetchSimilarBlog";
import { increaseBlogReadCount } from "./userRepository/user/increaseBlogReadCount";
import { FollowUser } from "./userRepository/user/FollowUser";
import { UnFollowUser } from "./userRepository/user/UnFollowUser";
import { likeBlogByUser } from "./userRepository/user/likeBlogByUser";
import { unLikeBlogByUser } from "./userRepository/user/unLikeBlogByUser";
import { initialLikebyUser } from "./userRepository/user/initialLikebyUser";
import { saveBlogByUser } from "./userRepository/user/saveBlogByUser";
import { unSavedBlogByUser } from "./userRepository/user/unSavedBlogByUser";
import { savedBlogsByUser } from "./userRepository/user/savedBlogsByUser";
import { listUserFollowers } from "./userRepository/user/listUserFollowers";
import { listUserFollowings } from "./userRepository/user/listUserFollowings";
import { CommentData, Comment } from "../../../../@types/general/Comments";
import { addBlogComment } from "./userRepository/user/addBlogComment";
import { initialBlogComments } from "./userRepository/user/initialBlogComments";
import { replyComment } from "./userRepository/user/replyComment";
import { reportBlogbyUser } from "./userRepository/user/reportBlogbyUser";
import { checkUserSubscribed } from "./userRepository/user/checkUserSubscribed";
import { monthlyUserSubscription } from "./userRepository/user/monthlyUserSubscription";
import { IPaymentService } from "../../../../usecasesLayer/interface/services/IpaymentService";
import { annualSubscription } from "./userRepository/user/annualSubscription";
import { webHook } from "./userRepository/user/webHook";
import { savePaymentData } from "./userRepository/user/savePaymentData";
import { reciptUrlForUser } from "./userRepository/user/reciptUrlForUser";
import { fetchAllUsersList } from "./userRepository/user/fetchAllUsersList";
import { IConversation } from "../../../../@types/general/chatData";
import { sendChatByUser } from "./userRepository/user/sendChatByUser";
import { getChatOfUser } from "./userRepository/user/getChatOfUser";
import { registerToken } from "./userRepository/user/registerToken";
import { fetchUserNotification } from "./userRepository/user/fetchUserNotification";
import { notificationSeen } from "./userRepository/user/notificationSeen";
import { notificationCount } from "./userRepository/user/notificationCount";
import { chatUserSearch } from "./userRepository/user/chatUserSearch";
import { editUserProfile } from "./userRepository/user/editUserProfile";
import { changePassword } from "./userRepository/user/changePassword";
import { forgotPasswordEmail } from "./userRepository/user/forgotPasswordEmail";
import { IcreateOTP } from "../../../../usecasesLayer/interface/services/IcreateOTP";
import { ISendMail } from "../../../../usecasesLayer/interface/services/IsendMail";
import { forgotPasswordOtp } from "./userRepository/user/forgotPasswordOtp";
import { changePasswordNotLoggedIN } from "./userRepository/user/changePasswordNotLoggedIN";
import { resendOtp } from "./userRepository/user/resendOtp";
import { googleAuth } from "./userRepository/user/googleAuth";




export class UserRepository implements IUserRepository {
    constructor(private userModels: typeof UserModel, private blogModels: typeof BlogModel, private commentModel: typeof CommentModel,) {}

    // find user by email
    async findUserByEmail(email: string): Promise<IUser | null> {
        console.log('email in repostory -->>> ', email)
        const userExist = await findUserByEmail(email);
        console.log('userExist --->>> ', userExist)
        return userExist
    }

    // create user
    async createUser(newUser: IUser): Promise<IUser> {
        return await createUser(newUser, this.userModels)
    }

    // create blog
    async userCreateBlog(title: string, des: string, banner: string, content: any, tags: string[], authorId: string, blog_id: string, draft: boolean): Promise<any> {
        console.log('reached inside userRepository')
        const result = await CreateBlog(title, des, banner, content, tags, authorId, blog_id, draft, this.userModels, BlogModel)
        console.log('result from userRepository -->> ', result)
        return result
    }

    // get latest blogs
    async latestBlog(page: number,next: NextFunction): Promise<any> {
        console.log('reached inside userRepository')
        
        const result = await latestBlogs(page,this.blogModels, this.userModels)
        console.log('got the result in userrepository-->> ')
        return result
    }

    // get trending blogs
    async trendingBlogs(next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await trendingBlog(this.blogModels, this.userModels)   
        return result
    }

    async fetchTags(next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await fetchAllTags(this.blogModels)
        return result
    }

    async filterByTag(tag: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await filteredByTag(tag, this.blogModels, this.userModels)
        return result
    }

    async searchByQueries(query: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await searchByQuery(query, this.blogModels) 
        return result  
    }

    async getProfile(userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await getUserProfile(userId,this.userModels, next)
        return result
    }

    async fetchUserBlogs(userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await fetchUserBlog(userId, this.userModels)
        return result
    }
    
    async fetchSingleBlog(blog_id: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await fetchBlog(blog_id, this.blogModels)
        return result
    }

    async fetchSimilarBlogs(tags: string[], next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await fetchSimilarBlog(tags, this.blogModels)
        return result
    }

    async increaseReadCount(userId: string, blogId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await increaseBlogReadCount(userId, blogId, this.blogModels, this.userModels)
        return result
    }

    async followUser(authorId: string, userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await FollowUser(authorId, userId,  this.userModels)
        return result
    }

    async unfollowUser(authorId: string, userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await UnFollowUser(authorId, userId,  this.userModels)
        return result
    }

    async likeBlog(blogId: string, userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await likeBlogByUser(blogId, userId, this.userModels, this.blogModels)
        return result
    }

    async unLikeBlog(blogId: string, userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await unLikeBlogByUser(blogId, userId, this.userModels, this.blogModels)
        return result
    }

    async intialLike(userId: string, blogId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await initialLikebyUser(userId, blogId, this.userModels)
        return result   
    }

    async saveBlog(blogId: string, userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
    const result = await saveBlogByUser(blogId, userId, this.userModels, this.blogModels)
        return result
    }

    async unSaveBlog(blogId: string, userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await unSavedBlogByUser(blogId, userId, this.userModels)
        return result
    }

    async savedBlogs(userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await savedBlogsByUser(userId, this.userModels, this.blogModels)
        return result
    }

    async listFollowers(userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepostory')
        const result = await listUserFollowers(userId, this.userModels)
        return result
    }

    async listFollowings(userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await listUserFollowings(userId, this.userModels)
        return result
    }

    async addComment(commentData: CommentData, comment: Comment, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await addBlogComment(commentData, comment, this.userModels, this.blogModels, this.commentModel)
        return result
    }

    async initialComments(blogId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await initialBlogComments(blogId, this.blogModels)
        return result
    }

    async addReplyComments(comment: string, parentCommentId: string, commentData: CommentData, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await replyComment(comment, parentCommentId, commentData, this.userModels, this.blogModels)
        return result
    }

    async reportBlog(blog_id: string, reason: string, reportedBy: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await reportBlogbyUser(blog_id, reason, reportedBy)
        return result 
    }

    async checkIsSubscribed(userId: string, next: NextFunction): Promise<any> {
        console.log('reached insidet he userRepository')
        const result = await checkUserSubscribed(userId)
        return result
    }

    async monthlySubscription(userId: string, subscriptionType: string, paymentService: IPaymentService): Promise<any> {
        const result = await monthlyUserSubscription(userId, subscriptionType, paymentService)
        return result
    }

    async annuallySubscription(userId: string, subscriptionType: string, paymentService: IPaymentService): Promise<any> {
        const result = await annualSubscription(userId, subscriptionType, paymentService)
        return result
    }

    async savingPaymentData(paymentMethod: any, userId: any, receipt_url: any, subscriptionType: string): Promise<any> {
        const result = await savePaymentData(paymentMethod, userId, receipt_url, subscriptionType)
        return result
    }

    async reciptUrl(userId: string): Promise<any> {
        const result = await reciptUrlForUser(userId)
        return result
    }

    async fetchAllUsers(): Promise<any> {
        const result = await fetchAllUsersList()
        return result
    }

    async sendChat(data: IConversation): Promise<any> {
        const result = await sendChatByUser(data)
        return result
    }

    async getChat(senderId: string, receiverId: string): Promise<any> {
        const result = await getChatOfUser(senderId, receiverId)
        return result
    }

    async registerUserToken(token: string, userId: string): Promise<any> {
        const result = await registerToken(token, userId)
        return result
    }

    async fetchUserNotification(userId: string): Promise<any> {
        const result = await fetchUserNotification(userId)
        return result
    }

    async notificationSeen(notificationId: string): Promise<any> {
        const result = await notificationSeen(notificationId)
        return result
    }

    async notificationCount(userId: string): Promise<any> {
        const result = await notificationCount(userId)
        return result
    }

    async chatUserSearch(query: string): Promise<any> {
        const result = await chatUserSearch(query)
        return result
    }

    async editUserProfile(personal_info: any, social_links: any, uploaded_image: string, userId: string): Promise<any> {
        const result = await editUserProfile(personal_info, social_links, uploaded_image, userId)
        console.log(result)
        return result
    }

    async changePassword(userId: string, newPassword: string): Promise<any> {
        const result = await changePassword(userId, newPassword)
        return result
    }

    async forgotPasswordEmail(email: string, otpGenerator: IcreateOTP, sendMail: ISendMail): Promise<any> {
        const result = await forgotPasswordEmail(email, otpGenerator, sendMail)
        return result
    }
      
    async forgotPasswordUserOtp(otp: string, email: string): Promise<any> {
        const result = await forgotPasswordOtp(otp, email)
        return result
    }

    async changePasswordNotLoggedIn(email: string, newPassword: string): Promise<any> {
        const result = await changePasswordNotLoggedIN(email, newPassword)
        return result
    }
     
    async resendOtp(email: string, sendMail: ISendMail, otpGenerator: IcreateOTP): Promise<any> {
        const result = await resendOtp(email, sendMail, otpGenerator)
        return result
    }

    async googleAuth(uid: string): Promise<any> {
        const result = await googleAuth(uid)
        return result
    }

    
}