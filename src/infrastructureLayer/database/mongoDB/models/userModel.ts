import mongoose, {Model, Schema} from "mongoose";
import IUser from '../../../../entitiesLayer/user'

const profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
const profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];



const userSchema: Schema<IUser> = new Schema<IUser>({
    personal_info: {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        bio: {type: String, default: ''},
        profile_img: {
            type: String,
            default: () => {
                return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
            } 
        },
    },
    social_links: {
        youtube: { type: String, default: '' },
        instagram: { type: String, default: '' },
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' },
        github: { type: String, default: '' },
        website: { type: String, default: '' },
    },
    account_info: {
        total_posts: { type: Number, default: 0 },
        total_reads: { type: Number, default: 0 },
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }], 
    userInteractions: {
        userReadBlogs: [{ blogId: { type: Schema.Types.ObjectId, ref: 'Blog' }, interactionAt: Date }],
        userLikedBlogs: [{ blogId: { type: Schema.Types.ObjectId, ref: 'Blog' }, interactionAt: Date }],
        userSavedBlogs: [{ blogId: { type: Schema.Types.ObjectId, ref: 'Blog' }, interactionAt: Date }],
        userReportBlogs: [{ blogId: { type: Schema.Types.ObjectId, ref: 'Blog' }, interactionAt: Date }],
        userCommentBlogs: [{ blogId: { type: Schema.Types.ObjectId, ref: 'Blog' }, interactionAt: Date }],
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    role: { type: String, enum: ['user', 'advertiser', 'admin'], default: 'user' },
    status: { type: String, enum: ['active', 'freeze'] },
    isVerified: {type: Boolean, default: false},
    isSubscribed: { type: Boolean, default: false },
    subscriptionId: { type: String, default: '' },
    NotificationToken: { type: String, default: ''},
    joinedAt: { type: Date, default: Date.now },
})


const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default UserModel