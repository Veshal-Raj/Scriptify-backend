import mongoose, {Model, Schema} from "mongoose";
import IUser from '../../../../entitiesLayer/user'


const userSchema: Schema<IUser> = new Schema<IUser>({
    personal_info: {
        fullname: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        bio: {type: String},
        profile_img: {type: String},
    },
    social_links: {
        youtube: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        twitter: { type: String },
        github: { type: String },
        website: { type: String },
    },
    account_info: {
        total_posts: { type: Number },
        total_reads: { type: Number },
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }], // Assuming 'Blog' is the name of your blog model
    role: { type: String, enum: ['user', 'advertiser', 'admin'], default: 'user' },
    status: { type: String, enum: ['active', 'freeze'] },
    isVerified: {type: Boolean, default: false},
    isSubscribed: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now },
})


const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default UserModel