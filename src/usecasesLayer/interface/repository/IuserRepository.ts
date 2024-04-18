import { Comment, CommentData } from "../../../@types/general/Comments";
import { IConversation } from "../../../@types/general/chatData";
import IUser from "../../../entitiesLayer/user";
import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserResponse } from "../request_response/user";
import { IcreateOTP } from "../services/IcreateOTP";
import { IPaymentService } from "../services/IpaymentService";
import { ISendMail } from "../services/IsendMail";



export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(newUser: IUser): Promise<IUser>;
    getAllUser(role: string): Promise<IUser []>;
    changeUserStatus(id: string): Promise<IUserResponse | null | IUser>
    userCreateBlog(
        title: string,
        des: string,
        banner: string,
        content: any, // Adjust the type according to your content structure
        tags: string[],
        authorId: string, // Assuming authorId is a string representing the ID of the author
        blog_id: string,
        draft: boolean
    ): Promise<any>;
    latestBlog(page: number,next: Next ): Promise<any>
    trendingBlogs(next: Next): Promise<any>
    fetchTags(next: Next): Promise<any>
    filterByTag(tag: string, next:Next): Promise<any>
    searchByQueries(query: string, next: Next): Promise<any>
    getProfile(userId: string, next: Next): Promise<any>
    fetchUserBlogs(userId: string, next: Next): Promise<any>
    fetchSingleBlog(blog_id: string, next: Next): Promise<any>
    fetchSimilarBlogs(tags: string[], next: Next): Promise<any>
    increaseReadCount(userId: string, blogId: string, next: Next): Promise<any>
    followUser(authorId: string, userId: string, next: Next): Promise<any>
    unfollowUser(authorId: string, userId: string, next: Next): Promise<any>
    likeBlog(blogId: string, userId: string, next: Next): Promise<any>
    unLikeBlog(blogId: string, userId: string, next: Next): Promise<any>
    intialLike(userId: string, blogId: string, next: Next): Promise<any>
    saveBlog(blogId: string, userId: string, next: Next): Promise<any>
    unSaveBlog(blogId: string, userId: string, next: Next): Promise<any>
    savedBlogs(userId: string, next: Next): Promise<any>
    listFollowers(userId: string, next: Next): Promise<any>
    listFollowings(userId: string, next: Next): Promise<any>
    addComment(commentData: CommentData, comment: Comment, next: Next): Promise<any>
    initialComments(blogId: string, next: Next): Promise<any>
    addReplyComments(comment: string, parentCommentId: string, commentData: CommentData, next: Next): Promise<any>
    reportBlog(blog_id: string, reason: string, reportedBy: string, next: Next): Promise<any>
    checkIsSubscribed(userId: string, next: Next): Promise<any>
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