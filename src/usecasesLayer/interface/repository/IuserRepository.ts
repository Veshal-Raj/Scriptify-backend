import { CommentData } from "../../../@types/general/Comments";
import { IConversation } from "../../../@types/general/chatData";
import IUser from "../../../entitiesLayer/user";
import { IcreateOTP } from "../services/IcreateOTP";
import { IPaymentService } from "../services/IpaymentService";
import { ISendMail } from "../services/IsendMail";



export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(newUser: IUser): Promise<IUser>;
    userCreateBlog(
        title: string,
        des: string,
        banner: string,
        content: any,
        tags: string[],
        authorId: string, 
        blog_id: string,
        draft: boolean
    ): Promise<any>;
    latestBlog(page: number  ): Promise<any>
    trendingBlogs( ): Promise<any>
    fetchTags( ): Promise<any>
    filterByTag(tag: string): Promise<any>
    searchByQueries(query: string ): Promise<any>
    getProfile(userId: string ): Promise<any>
    fetchUserBlogs(userId: string ): Promise<any>
    fetchSingleBlog(blog_id: string ): Promise<any>
    fetchSimilarBlogs(tags: string[] ): Promise<any>
    increaseReadCount(userId: string, blogId: string ): Promise<any>
    followUser(authorId: string, userId: string ): Promise<any>
    unfollowUser(authorId: string, userId: string ): Promise<any>
    likeBlog(blogId: string, userId: string ): Promise<any>
    unLikeBlog(blogId: string, userId: string ): Promise<any>
    intialLike(userId: string, blogId: string ): Promise<any>
    saveBlog(blogId: string, userId: string ): Promise<any>
    unSaveBlog(blogId: string, userId: string ): Promise<any>
    savedBlogs(userId: string ): Promise<any>
    listFollowers(userId: string): Promise<any>
    listFollowings(userId: string ): Promise<any>
    addComment(commentData: CommentData, comment: string ): Promise<any>
    initialComments(blogId: string ): Promise<any>
    addReplyComments(comment: string, parentCommentId: string, commentData: CommentData ): Promise<any>
    reportBlog(blog_id: string, reason: string, reportedBy: string ): Promise<any>
    checkIsSubscribed(userId: string ): Promise<any>
    monthlySubscription(userId: string, subscriptionType: string, paymentService: IPaymentService): Promise<any>
    annuallySubscription(userId: string, subscriptionType: string, paymentService: IPaymentService): Promise<any>
    webhook(body: any, sig: any ): Promise<any>
    savingPaymentData(paymentMethod: any, userId: any, receipt_url: any, subscriptionType: string): Promise<any>
    reciptUrl(userId: string): Promise<any>
    fetchAllUsers(): Promise<any>
    sendChat(data: IConversation): Promise<any>
    getChat(senderId: string, receiverId: string): Promise<any>
    registerUserToken(token: string, userId: string): Promise<any>
    fetchUserNotification(userId: string): Promise<any>
    notificationSeen(notificationId: string): Promise<any>
    notificationCount(userId: string): Promise<any>
    chatUserSearch(query: string): Promise<any>
    editUserProfile(personal_info: any, social_links: any, uploaded_image: string, userId: string): Promise<any>
    changePassword(userId: string,newPassword: string): Promise<any>
    forgotPasswordEmail(email: string, otpGenerator: IcreateOTP, sendMail: ISendMail): Promise<any>
    forgotPasswordUserOtp(otp: string, email: string): Promise<any>
    changePasswordNotLoggedIn(email: string, newPassword: string): Promise<any>
    resendOtp(email: string, sendMail: ISendMail, otpGenerator: IcreateOTP): Promise<any>
    googleAuth(uid: string): Promise<any>
}