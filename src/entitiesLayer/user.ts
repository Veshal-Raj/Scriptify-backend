
interface IUserInteraction {
    blogId: string;
    interactionAt: Date;
}


interface IUser {
    _id?: string;
    personal_info: {
        username: string;
        email: string;
        password: string;
        bio?: string;
        profile_img?: string;
    };
    social_links?: {
        youtube?: string;
        instagram?: string;
        facebook?: string;
        twitter?: string;
        github?: string;
        website?: string;
    };
    account_info?: {
        total_posts?: number;
        total_reads?: number;
    };
    // google_auth: boolean;
    blogs?: string[]; // an array of blog IDs
    userInteractions: {
        userReadBlogs: IUserInteraction[];
        userLikedBlogs: IUserInteraction[];
        userSavedBlogs: IUserInteraction[];
        userReportBlogs: IUserInteraction[];
        userCommentBlogs: IUserInteraction[];
    };
    followers: string[]; 
    following: string[];
    role?: "user" | "advertiser" | "admin";
    status?: "active" | "freeze";
    isVerified?: boolean;
    isSubscribed?: false;
    subscriptionId?: String;
    joinedAt?: Date;
}

export default IUser;
