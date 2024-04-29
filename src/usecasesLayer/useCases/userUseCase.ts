import IUser from "../../entitiesLayer/user";
import { ErrorHandler } from "../middlewares/errorHandler";
import { Next, Req, Res } from "../../infrastructureLayer/types/serverPackageTypes";
import CustomLogger from "../../infrastructureLayer/services/errorLogging";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { IOtpRepository } from "../interface/repository/IotpRepository";
import { IUserUseCase } from "../interface/usecase/userUseCase";
import { IHashpassword } from "../interface/services/IhashPassword";
import { IcreateOTP } from "../interface/services/IcreateOTP";
import { ISendMail } from "../interface/services/IsendMail";
import { IJwt, IToken } from "../interface/services/Ijwt.types";
import { IcloudSession } from "../interface/services/IcloudSession";
import { IcloudStorage } from "../interface/services/IcloudStorage";
import { IPaymentService } from "../interface/services/IpaymentService";
import { Comment, CommentData } from "../../@types/general/Comments";
import { IConversation } from "../../@types/general/chatData";

import { createUser, registerUser, login, userCreateBlog, latestBlogs, trendingBlogs, Tags, filteredByTag, searchByQueries, 
  getUserProfile , fetchUserblog, fetchBlog, fetchSimilarBlog, increaseBlogReadCount, FollowUser, unFollowUser, likeBlogByUser,
  unLikeBlogByUser, initialLikebyUser, saveBlogByUser, unSavedBlogByUser, savedBlogsByUser, listUserFollowers, listUserFollowings,
  addBlogComment, initialBlogComment, replyComment, reportBlogbyUser, checkUserSubscribed, monthlyUserSubscription, annualSubscription,
  savePaymentData, reciptUrlForUser, fetchAllUserList, sendChatFromSender, getChatOfUser, registerToken, fetchUserNotification,
  notificationSeenByUser, notificationCount, chatUserSearchText, editUserProfileData, changePassword, forgotPasswordEmail, forgotPasswordUserOtp,
  changePasswordNotLoggedIn, resendOtp, googleAuth, logout} from "./user/root/index";


export class UserUseCase implements IUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly otpGenerator: IcreateOTP;
  private readonly sendMail: ISendMail;
  private readonly otpRepository: IOtpRepository;
  private readonly jwtToken: IJwt;
  private readonly cloudSession: IcloudSession;
  private readonly cloudStorage: IcloudStorage;
  private readonly logger: CustomLogger;
  private readonly paymentService: IPaymentService

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    otpGenerator: IcreateOTP,
    sendMail: ISendMail,
    otpRepository: IOtpRepository,
    jwtToken: IJwt,
    cloudSession: IcloudSession,
    cloudStorage: IcloudStorage,
    logger: CustomLogger,
    paymentService: IPaymentService
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.otpGenerator = otpGenerator;
    this.sendMail = sendMail;
    this.otpRepository = otpRepository;
    this.jwtToken = jwtToken;
    this.cloudSession = cloudSession;
    this.cloudStorage = cloudStorage;
    this.logger = logger;
    this.paymentService = paymentService
  }

  // register user
  async registerUser({username,email,password,}: { username: string; email: string; password: string },next: Next): Promise<string | void | never> {
    try {
      return await registerUser(this.otpRepository, this.userRepository, this.sendMail, this.otpGenerator, this.jwtToken, this.bcrypt,
        email, username, password, next, this.logger);
    } catch (error: unknown | never) {
      return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error",this.logger)
      );
    }
  }

  async createUser(otpFromUser: string,token: string,next: Next): Promise<void | IUser | { message: string }> {
    try {
      console.log("otp from user ---->>>> ",otpFromUser,"token ------->>>>> ",token);
      return await createUser( this.userRepository, this.otpRepository, this.jwtToken, this.cloudSession, otpFromUser, token, next, this.logger );
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async login({ email, password }: { email: string; password: string },next: Next): Promise<void | { user: IUser; tokens: IToken }> {
    try {      
       return await login( this.userRepository, this.bcrypt, this.jwtToken, this.cloudSession,email,password, next, this.logger);      
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async logout(req: Req, res: Res, next: Next): Promise<any | void> {
    try {
      return await logout(this.cloudSession, req, res, next, this.logger)      
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async generateUploadURL(next: Next): Promise<any | void> {
    try {
      const uploadURL = await this.cloudStorage.generateUploadURL(next);
        console.log(uploadURL)
      return uploadURL
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async createBlog(title: string, des: string, banner: string, content: any, tags: string[], author: string, blog_id: string, draft: boolean, next: Next): Promise<any> {
    try {
      return  await userCreateBlog( this.userRepository, title, des, banner, content, tags, author, blog_id, draft, this.logger )
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async latestBlog(page: number,next: Next): Promise<any> {
    try {
        return await latestBlogs(page,this.userRepository, next, this.logger) 
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async trendingBlog(next: Next): Promise<any> {
    try {
      return await trendingBlogs(this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async exploreTags(next: Next): Promise<any> {
    try {
        return await Tags(this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async filterByTags(tag:string, next: Next): Promise<any> {
    try {
      return await filteredByTag(tag, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async searchByQuery(query: string, next: Next): Promise<any> {
    try {
      return await searchByQueries(query, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }
  
  async getProfile(userId: string, next: Next): Promise<any> {
    try {
      return await getUserProfile(userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }
  
  async fetchUserBlogs(userId: string, next: Next): Promise<any> {
    try {
      return await fetchUserblog(userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async fetchSingleBlog(blog_id: string, next: Next): Promise<any> {
    try {
      return await fetchBlog(blog_id, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async fetchSimilarBlogs(tags: string[], next: Next): Promise<any> {
    try {
      return await fetchSimilarBlog(tags, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async increaseReadCount(userId: string, blogId: string, next: Next): Promise<any> {
    try {
      return await increaseBlogReadCount(userId, blogId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async followUser(authorId: string, userId: string, next: Next): Promise<any> {
    try {
      return await FollowUser(authorId, userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async unfollowUser(authorId: string, userId: string, next: Next): Promise<any> {
    try {
      return await unFollowUser(authorId, userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async likeBlog (blogId: string, userId: string, next: Next): Promise<any> {
    try {
      return await likeBlogByUser(blogId, userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async unLikeBlog (blogId: string, userId: string, next: Next): Promise<any> {
    try {
      return await unLikeBlogByUser(blogId, userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async initialLike (userId: string, blogId: string, next: Next): Promise<any> {
    try {
      return await initialLikebyUser(userId, blogId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async saveBlog(blogId: string, userId: string, next: Next): Promise<any> {
    try{
        return await saveBlogByUser(blogId, userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async unSaveBlog(blogId: string, userId: string, next: Next): Promise<any> {
    try {
      return await unSavedBlogByUser(blogId, userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async savedBlogs(userId: string, next: Next): Promise<any> {
    try {
      return await savedBlogsByUser(userId, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async listFollowers(userId: string, next: Next): Promise<any> {
    try{
      return await listUserFollowers(userId, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async listFollowings(userId: string, next: Next): Promise<any> {
    try {
      return await listUserFollowings(userId, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async addComment( commentData: CommentData, comment: Comment, next: Next) : Promise<any> {
    try {
      return await addBlogComment( commentData, comment, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async initialComments(blogId: string, next: Next ): Promise<any>{ 
    try {
      return await initialBlogComment(blogId, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async addReplyComment(comment: string, parentCommentId: string, commentData: CommentData ,next: Next): Promise<any> {
    try {
        return await replyComment(comment, parentCommentId, commentData, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async reportBlog(blog_id: string, reason: string, reportedBy: string, next: Next): Promise<any | void> {
    try {
      return await reportBlogbyUser(blog_id, reason, reportedBy, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async checkIsSubscribed(userId: string, next: Next): Promise<any | void> {
    try { 
        return await checkUserSubscribed(userId, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async monthlySubscription(userId: string, subscriptionType: string, next:Next): Promise<any | void> {
    try {
      return await monthlyUserSubscription(userId, subscriptionType,next,this.userRepository,this.paymentService, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async annuallySubscription(userId: string, subscriptionType: string, next: Next): Promise<any | void> {
    try {
      return await annualSubscription(userId, subscriptionType, next, this.userRepository, this.paymentService, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async webhook( body: any, sig: any, next: Next): Promise<any | void> {
    try {
        const response = await this.paymentService.webHook(body, sig)
        console.log('response in usecase --->>>> ', response)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async savingPaymentData(paymentMethod: string, userId: string, receipt_url: string, subscriptionType: string, next: Next): Promise<any | void> {
    try {
        return await savePaymentData(paymentMethod, userId, receipt_url, subscriptionType, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async reciptUrl(userId: string, next: Next): Promise<any | void> {
    try {
        return await reciptUrlForUser(userId, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async  fetchAllUsers(next: Next): Promise<any | void>  {
    try {
        return await fetchAllUserList(next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async sendChat(data: IConversation, next: Next): Promise<any | void> {
    try {
        return await sendChatFromSender(data, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async getChat(senderId: string, receiverId: string, next: Next): Promise<any | void> {
    try {
        return await getChatOfUser(senderId, receiverId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async registerNotificationToken(token: string, userId: string, next: Next): Promise<any | void> {
    try {
        return await registerToken(token, userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async fetchAllUserNotification(userId: string, next: Next): Promise<any | void> {
    try {
        return await fetchUserNotification(userId, this.userRepository, next, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async notificationSeen(notificationId: string, next: Next): Promise<any | void> {
    try {
        return await notificationSeenByUser(notificationId, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async notificationCount(userId: string, next: Next): Promise<any | void> {
    try {
        return await notificationCount(userId, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async chatUserSearch(query: string, next: Next): Promise<any | void> {
    try {
      return await chatUserSearchText(query, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async editUserProfile(personal_info: any, social_links: any, uploaded_image: string, userId: string, next: Next): Promise<any | void> {
    try {
        return await editUserProfileData(personal_info, social_links, uploaded_image, userId, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)); 
    }
  }

  async changePassword(userId: string, newPassword: string, next: Next): Promise<any | void> {
    try {
        return await changePassword(userId, newPassword, next, this.bcrypt, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)); 
    }
  }

  async forgotPasswordEmail(email: string, next: Next): Promise<any | void> {
    try {        
        return await forgotPasswordEmail(email, next, this.userRepository,this.otpGenerator, this.sendMail,  this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)); 
    }
  }
  
  async forgotPasswordOtp(otp: string, email: string, next: Next): Promise<any | void> {
    try {
        return await forgotPasswordUserOtp(otp, email, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)); 
    }
  }

  async changePasswordNotLoggedIn(email: string, newPassword: string, next: Next): Promise<any | void>{
    try {
        return await changePasswordNotLoggedIn(email, newPassword, next, this.bcrypt, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)); 
    }
  }

  async resendOtp(token: string, next: Next): Promise<any | void> {
    try {
        return await resendOtp  (token, next,this.otpRepository, this.userRepository,this.jwtToken, this.sendMail, this.otpGenerator, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)); 
    }
  }

  async googleAuth(uid: string, next: Next): Promise<any | void> {
    try {
      return await googleAuth(uid, next, this.userRepository, this.logger)
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)); 
    }
  }
}
