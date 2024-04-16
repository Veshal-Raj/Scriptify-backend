import IUser from "../../entitiesLayer/user";
import { IUserUseCase } from "../interface/usecase/userUseCase";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { Next } from "../../infrastructureLayer/types/serverPackageTypes";
import { ErrorHandler } from "../middlewares/errorHandler";

import { createUser, registerUser, login, userCreateBlog } from "./user/index";
import { IHashpassword } from "../interface/services/IhashPassword";
import { IcreateOTP } from "../interface/services/IcreateOTP";
import { ISendMail } from "../interface/services/IsendMail";
import { IJwt, IToken } from "../interface/services/Ijwt.types";
import { IOtpRepository } from "../interface/repository/IotpRepository";
import CustomLogger from "../../infrastructureLayer/services/errorLogging";
import { IcloudSession } from "../interface/services/IcloudSession";
import { IcloudStorage } from "../interface/services/IcloudStorage";
import { latestBlogs } from "./user/latestBlogs";
import { trendingBlogs } from "./user/trendingBlogs";
import { Tags } from "./user/tags";
import { filteredByTag } from "./user/filteredByTag";
import { searchByQueries } from "./user/searchByQueries";
import { getUserProfile } from "./user/getUserProfile";
import { fetchUserblog } from "./user/fetchUserblog";
import { fetchBlog } from "./user/fetchBlog";
import { fetchSimilarBlog } from "./user/fetchSimilarBlog";
import { increaseBlogReadCount } from "./user/increaseBlogReadCount";
import { FollowUser } from "./user/FollowUser";
import { unFollowUser } from "./user/unFollowUser";
import { likeBlogByUser } from "./user/likeBlogByUser";
import { unLikeBlogByUser } from "./user/unLikeBlogByUser";
import { initialLikebyUser } from "./user/initialLikebyUser";
import { saveBlogByUser } from "./user/saveBlogByUser";
import { unSavedBlogByUser } from "./user/unSavedBlogByUser";
import { savedBlogsByUser } from "./user/savedBlogsByUser";
import { listUserFollowers } from "./user/listUserFollowers";
import { listUserFollowings } from "./user/listUserFollowings";
import { Comment, CommentData } from "../../@types/general/Comments";
import { addBlogComment } from "./user/addBlogComment";
import { initialBlogComment } from "./user/initialBlogComment";
import { replyComment } from "./user/replyComment";
import { reportBlogbyUser } from "./user/reportBlogbyUser";
import { checkUserSubscribed } from "./user/checkUserSubscribed";
import { monthlyUserSubscription } from "./user/monthlyUserSubscription";
import { IPaymentService } from "../interface/services/IpaymentService";
import { annualSubscription } from "./user/annualSubscription";
import { webhookUseCaseEngine } from "./user/webhookUseCaseEngine";
import { savePaymentData } from "./user/savePaymentData";
import { reciptUrlForUser } from "./user/reciptUrlForUser";
import { fetchAllUserList } from "./user/fetchAllUserList";
import { IConversation } from "../../@types/general/chatData";
import { sendChatFromSender } from "./user/sendChatFromSender";
import { getChatOfUser } from "./user/getChatOfUser";
import { registerToken } from "./user/registerToken";
import { fetchUserNotification } from "./user/fetchUserNotification";
import { notificationSeenByUser } from "./user/notificationSeenByUser";
import { notificationCount } from "./user/notificationCount";
import { chatUserSearchText } from "./user/chatUserSearchText";
import { editUserProfileData } from "./user/editUserProfileData";

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
  async registerUser(
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    next: Next
  ): Promise<string | void | never> {
    try {
      let result = await registerUser(
        this.otpRepository,
        this.userRepository,
        this.sendMail,
        this.otpGenerator,
        this.jwtToken,
        this.bcrypt,
        email,
        username,
        password,
        next,
        this.logger
      );

      return result;
    } catch (error: unknown | never) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async createUser(
    otpFromUser: string,
    token: string,
    next: Next
  ): Promise<void | IUser | { message: string }> {
    try {
      console.log(
        "otp from user ---->>>> ",
        otpFromUser,
        "token ------->>>>> ",
        token
      );
      return await createUser(
        this.userRepository,
        this.otpRepository,
        this.jwtToken,
        otpFromUser,
        token,
        next,
        this.logger
      );
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async login(
    { email, password }: { email: string; password: string },
    next: Next
  ): Promise<void | { user: IUser; tokens: IToken }> {
    console.log('reached inside the login ')
    try {
       return await login(
        this.userRepository,
        this.bcrypt,
        this.jwtToken,
        this.cloudSession,
        email,
        password,
        next,
        this.logger
      );
      
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async generateUploadURL(next: Next): Promise<any | void> {
    try {
      console.log('reached inside the usecaselayer')
      const uploadURL = await this.cloudStorage.generateUploadURL(next);
        console.log(uploadURL)
      return uploadURL
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async createBlog(title: string, des: string, banner: string, content: any, tags: string[], author: string, blog_id: string, draft: boolean, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaseLayer')
      const result =  await userCreateBlog( this.userRepository, title, des, banner, content, tags, author, blog_id, draft, this.logger )
      console.log('result in userusecase -->> ', result)
      return result
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async latestBlog(page: number,next: Next): Promise<any> {
    try {
        console.log('reached inside the usecaselayer')
        const response = await latestBlogs(page,this.userRepository, next, this.logger)
        // console.log(response) 
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async trendingBlog(next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await trendingBlogs(this.userRepository, next, this.logger)
      return response 
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async exploreTags(next: Next): Promise<any> {
    try {
        console.log('reached inside the usecaselayer')
        const response = await Tags(this.userRepository, next, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async filterByTags(tag:string, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await filteredByTag(tag, this.userRepository, next, this.logger)
      // console.log(response) 
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async searchByQuery(query: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await searchByQueries(query, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }
  
  async getProfile(userId: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await getUserProfile(userId, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }
  
  async fetchUserBlogs(userId: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await fetchUserblog(userId, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async fetchSingleBlog(blog_id: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await fetchBlog(blog_id, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async fetchSimilarBlogs(tags: string[], next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await fetchSimilarBlog(tags, this.userRepository, next, this.logger)
      return response

    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async increaseReadCount(userId: string, blogId: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await increaseBlogReadCount(userId, blogId, this.userRepository, next, this.logger)
      return response

    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async followUser(authorId: string, userId: string, next: Next): Promise<any> {
    try {
      console.log(' reached inside the usecaseLayer')
    const response = await FollowUser(authorId, userId, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async unfollowUser(authorId: string, userId: string, next: Next): Promise<any> {
    try {
      console.log(' reached inside the usecaseLayer')
      const response = await unFollowUser(authorId, userId, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async likeBlog (blogId: string, userId: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await likeBlogByUser(blogId, userId, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async unLikeBlog (blogId: string, userId: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await unLikeBlogByUser(blogId, userId, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async initialLike (userId: string, blogId: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await initialLikebyUser(userId, blogId, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async saveBlog(blogId: string, userId: string, next: Next): Promise<any> {
    try{
        console.log('reached inside the usecaselayer')
        const response = await saveBlogByUser(blogId, userId, this.userRepository, next, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async unSaveBlog(blogId: string, userId: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the userCaselayer')
      const response = await unSavedBlogByUser(blogId, userId, this.userRepository, next, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async savedBlogs(userId: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the userUsecaseLayer')
      const response = await savedBlogsByUser(userId, next, this.userRepository, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async listFollowers(userId: string, next: Next): Promise<any> {
    try{
      console.log('reached inside the userUsecaselayer')
      const response = await listUserFollowers(userId, next, this.userRepository, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async listFollowings(userId: string, next: Next): Promise<any> {
    try {
      console.log('reached inside the userUsecaselayer')
      const response = await listUserFollowings(userId, next, this.userRepository, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async addComment( commentData: CommentData, comment: Comment, next: Next) : Promise<any> {
    try {
      console.log('reached inside the userUsecaselayer')
      const response = await addBlogComment( commentData, comment, next, this.userRepository, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async initialComments(blogId: string, next: Next ): Promise<any>{ 
    try {
      console.log('reached inside the userUsecaselayer')
      const response = await initialBlogComment(blogId, next, this.userRepository, this.logger)
      return response 
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async addReplyComment(comment: string, parentCommentId: string, commentData: CommentData ,next: Next): Promise<any> {
    try {
        console.log('reached inside the userUsecaselayer')
        const response = await replyComment(comment, parentCommentId, commentData, next, this.userRepository, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async reportBlog(blog_id: string, reason: string, reportedBy: string, next: Next): Promise<any | void> {
    try {
      console.log('reached inside the userUsecaslayer')
      const response = await reportBlogbyUser(blog_id, reason, reportedBy, next, this.userRepository, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async checkIsSubscribed(userId: string, next: Next): Promise<any | void> {
    try { 
        console.log('reached inside the userUsecaselayer')
        const response = await checkUserSubscribed(userId, next, this.userRepository, this.logger)
        console.log('response ', response)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async monthlySubscription(userId: string, subscriptionType: string, next:Next): Promise<any | void> {
    try {
      console.log('reached inside the userUsecaselayer')
      const response = await monthlyUserSubscription(userId, subscriptionType,next,this.userRepository,this.paymentService, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async annuallySubscription(userId: string, subscriptionType: string, next: Next): Promise<any | void> {
    try {
      const response = await annualSubscription(userId, subscriptionType, next, this.userRepository, this.paymentService, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async webhook(data: any, body: any, sig: any, next: Next): Promise<any | void> {
    try {
        const response = await this.paymentService.webHook(body, sig)
        console.log('response in usecase --->>>> ', response)
        return response
        // const response = await webhookUseCaseEngine( body, sig, next, this.userRepository, this.paymentService, this.logger)
        // if (!response) return null
        // return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async savingPaymentData(paymentMethod: string, userId: string, receipt_url: string, subscriptionType: string, next: Next): Promise<any | void> {
    try {
        const response = await savePaymentData(paymentMethod, userId, receipt_url, subscriptionType, next, this.userRepository, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async reciptUrl(userId: string, next: Next): Promise<any | void> {
    try {
        const response = await reciptUrlForUser(userId, next, this.userRepository, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async  fetchAllUsers(next: Next): Promise<any | void>  {
    try {
        const response = await fetchAllUserList(next, this.userRepository, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async sendChat(data: IConversation, next: Next): Promise<any | void> {
    try {
        const response = await sendChatFromSender(data, this.userRepository, next, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async getChat(senderId: string, receiverId: string, next: Next): Promise<any | void> {
    try {
        const response = await getChatOfUser(senderId, receiverId, this.userRepository, next, this.logger)
        return response 
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async registerNotificationToken(token: string, userId: string, next: Next): Promise<any | void> {
    try {
        const response = await registerToken(token, userId, this.userRepository, next, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async fetchAllUserNotification(userId: string, next: Next): Promise<any | void> {
    try {
        const response = await fetchUserNotification(userId, this.userRepository, next, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async notificationSeen(notificationId: string, next: Next): Promise<any | void> {
    try {
        const response = await notificationSeenByUser(notificationId, next, this.userRepository, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async notificationCount(userId: string, next: Next): Promise<any | void> {
    try {
        const response = await notificationCount(userId, next, this.userRepository, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async chatUserSearch(query: string, next: Next): Promise<any | void> {
    try {
      const response = await chatUserSearchText(query, next, this.userRepository, this.logger)
      return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger));
    }
  }

  async editUserProfile(personal_info: any, social_links: any, uploaded_image: string, userId: string, next: Next): Promise<any | void> {
    try {
        const response = await editUserProfileData(personal_info, social_links, uploaded_image, userId, next, this.userRepository, this.logger)
        return response
    } catch (error: unknown | never) {
      return next( new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)); 
    }
  }
}
