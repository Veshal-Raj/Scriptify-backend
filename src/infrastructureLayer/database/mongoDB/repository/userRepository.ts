import IUser from "../../../../entitiesLayer/user";
import { IUserRepository } from "../../../../usecasesLayer/interface/repository/IuserRepository";
import UserModel from "../models/userModel";
import BlogModel from "../models/blogModel";

import { CreateBlog, createUser, findUserByEmail, latestBlogs, trendingBlog, fetchAllTags, filteredByTag, searchByQuery,
    getUserProfile, fetchUserBlog, fetchBlog, fetchSimilarBlog, increaseBlogReadCount, FollowUser, UnFollowUser, likeBlogByUser,
    unLikeBlogByUser, initialLikebyUser, saveBlogByUser, unSavedBlogByUser, savedBlogsByUser, listUserFollowers, listUserFollowings,
    addBlogComment, initialBlogComments, replyComment, reportBlogbyUser, checkUserSubscribed, monthlyUserSubscription, annualSubscription,
    savePaymentData, reciptUrlForUser, fetchAllUsersList, sendChatByUser, getChatOfUser, registerToken, fetchUserNotification, notificationSeen,
    notificationCount, chatUserSearch, editUserProfile, changePassword, forgotPasswordEmail, forgotPasswordOtp, changePasswordNotLoggedIN,
    resendOtp, googleAuth
 } from "./userRepository/user/root";
 
 import { IPaymentService } from "../../../../usecasesLayer/interface/services/IpaymentService";
 import { IcreateOTP } from "../../../../usecasesLayer/interface/services/IcreateOTP";
 import { ISendMail } from "../../../../usecasesLayer/interface/services/IsendMail";
 import { IConversation } from "../../../../@types/general/chatData";
 import { CommentData } from "../../../../@types/general/Comments";


export class UserRepository implements IUserRepository {
  constructor(
    private userModels: typeof UserModel,
    private blogModels: typeof BlogModel  ) {}

  webhook(body: any, sig: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  // find user by email
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await findUserByEmail(email);
  }

  // create user
  async createUser(newUser: IUser): Promise<IUser> {
    return await createUser(newUser, this.userModels);
  }

  // create blog
  async userCreateBlog(
    title: string,
    des: string,
    banner: string,
    content: any,
    tags: string[],
    authorId: string,
    blog_id: string,
    draft: boolean
  ): Promise<any> {
    return await CreateBlog(
      title,
      des,
      banner,
      content,
      tags,
      authorId,
      blog_id,
      draft,
      this.userModels,
      BlogModel
    );
  }

  // get latest blogs
  async latestBlog(page: number): Promise<any> {
    return await latestBlogs(page, this.blogModels);
  }

  // get trending blogs
  async trendingBlogs(): Promise<any> {
    return await trendingBlog(this.blogModels);
  }

  async fetchTags(): Promise<any> {
    return await fetchAllTags(this.blogModels);
  }

  async filterByTag(tag: string): Promise<any> {
    return await filteredByTag(tag, this.blogModels);
  }

  async searchByQueries(query: string): Promise<any> {
    return await searchByQuery(query, this.blogModels);
  }

  async getProfile(userId: string,): Promise<any> {
    return await getUserProfile(userId, this.userModels);
  }

  async fetchUserBlogs(userId: string): Promise<any> {
    return await fetchUserBlog(userId, this.userModels);
  }

  async fetchSingleBlog(blog_id: string): Promise<any> {
    return await fetchBlog(blog_id, this.blogModels);
  }

  async fetchSimilarBlogs(tags: string[]): Promise<any> {
    return await fetchSimilarBlog(tags, this.blogModels);
  }

  async increaseReadCount(userId: string, blogId: string): Promise<any> {
    return await increaseBlogReadCount(
      userId,
      blogId,
      this.blogModels,
      this.userModels
    );
  }

  async followUser(authorId: string, userId: string): Promise<any> {
    return await FollowUser(authorId, userId, this.userModels);
  }

  async unfollowUser(authorId: string, userId: string): Promise<any> {
    return await UnFollowUser(authorId, userId, this.userModels);
  }

  async likeBlog(blogId: string, userId: string): Promise<any> {
    return await likeBlogByUser(
      blogId,
      userId,
      this.userModels,
      this.blogModels
    );
  }

  async unLikeBlog(blogId: string, userId: string): Promise<any> {
    return await unLikeBlogByUser(
      blogId,
      userId,
      this.userModels,
      this.blogModels
    );
  }

  async intialLike(userId: string, blogId: string): Promise<any> {
    return await initialLikebyUser(userId, blogId, this.userModels);
  }

  async saveBlog(blogId: string, userId: string): Promise<any> {
    return await saveBlogByUser(
      blogId,
      userId,
      this.userModels,
      this.blogModels
    );
  }

  async unSaveBlog(blogId: string, userId: string): Promise<any> {
    return await unSavedBlogByUser(blogId, userId, this.userModels);
  }

  async savedBlogs(userId: string): Promise<any> {
    return await savedBlogsByUser(
      userId,
      this.userModels,
      this.blogModels
    );
  }

  async listFollowers(userId: string): Promise<any> {
    return await listUserFollowers(userId, this.userModels);
  }

  async listFollowings(userId: string): Promise<any> {
    return await listUserFollowings(userId, this.userModels);
  }

  async addComment(commentData: CommentData, comment: string): Promise<any> {
    return await addBlogComment(
      commentData,
      comment,
      this.userModels,
      this.blogModels,      
    );
  }

  async initialComments(blogId: string): Promise<any> {
    return await initialBlogComments(blogId, this.blogModels);
  }

  async addReplyComments(
    comment: string,
    parentCommentId: string,
    commentData: CommentData
  ): Promise<any> {
    return await replyComment(
      comment,
      parentCommentId,
      commentData,      
    );
  }

  async reportBlog(
    blog_id: string,
    reason: string,
    reportedBy: string
  ): Promise<any> {
    return await reportBlogbyUser(blog_id, reason, reportedBy);
  }

  async checkIsSubscribed(userId: string): Promise<any> {
    return await checkUserSubscribed(userId);
  }

  async monthlySubscription(
    userId: string,
    subscriptionType: string,
    paymentService: IPaymentService
  ): Promise<any> {
    return await monthlyUserSubscription(
      userId,
      subscriptionType,
      paymentService
    );
  }

  async annuallySubscription(
    userId: string,
    subscriptionType: string,
    paymentService: IPaymentService
  ): Promise<any> {
    return await annualSubscription(
      userId,
      subscriptionType,
      paymentService
    );
  }

  async savingPaymentData(
    paymentMethod: any,
    userId: any,
    receipt_url: any,
    subscriptionType: string
  ): Promise<any> {
    return await savePaymentData(
      paymentMethod,
      userId,
      receipt_url,
      subscriptionType
    );
  }

  async reciptUrl(userId: string): Promise<any> {
    return await reciptUrlForUser(userId);
  }

  async fetchAllUsers(): Promise<any> {
    return await fetchAllUsersList();
  }

  async sendChat(data: IConversation): Promise<any> {
    return await sendChatByUser(data);
  }

  async getChat(senderId: string, receiverId: string): Promise<any> {
    return await getChatOfUser(senderId, receiverId);
  }

  async registerUserToken(token: string, userId: string): Promise<any> {
    return await registerToken(token, userId);
  }

  async fetchUserNotification(userId: string): Promise<any> {
    return await fetchUserNotification(userId);
  }

  async notificationSeen(notificationId: string): Promise<any> {
    return await notificationSeen(notificationId);
  }

  async notificationCount(userId: string): Promise<any> {
    return await notificationCount(userId);
  }

  async chatUserSearch(query: string): Promise<any> {
    return await chatUserSearch(query);
  }

  async editUserProfile(
    personal_info: any,
    social_links: any,
    uploaded_image: string,
    userId: string
  ): Promise<any> {
    return await editUserProfile(
      personal_info,
      social_links,
      uploaded_image,
      userId
    );
  }

  async changePassword(userId: string, newPassword: string): Promise<any> {
    return await changePassword(userId, newPassword);
  }

  async forgotPasswordEmail(
    email: string,
    otpGenerator: IcreateOTP,
    sendMail: ISendMail
  ): Promise<any> {
    return await forgotPasswordEmail(email, otpGenerator, sendMail);
  }

  async forgotPasswordUserOtp(otp: string, email: string): Promise<any> {
    return await forgotPasswordOtp(otp, email);
  }

  async changePasswordNotLoggedIn(
    email: string,
    newPassword: string
  ): Promise<any> {
    return await changePasswordNotLoggedIN(email, newPassword);
  }

  async resendOtp(
    email: string,
    sendMail: ISendMail,
    otpGenerator: IcreateOTP
  ): Promise<any> {
    return await resendOtp(email, sendMail, otpGenerator);
  }

  async googleAuth(uid: string): Promise<any> {
    return await googleAuth(uid);
  }
}
