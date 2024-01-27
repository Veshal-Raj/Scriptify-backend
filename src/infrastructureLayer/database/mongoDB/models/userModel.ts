import mongoose, {Model, Schema} from "mongoose";
import {IUser} from '../../../../entitiesLayer/user'

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter a valid name"],
        min: 3
    },
    email: {
        type: String,
        required: [true, "please provide a valid email"],
        unique: true,
    },
    password: {
        type: String,
        minLength: [6, "password must be atleast six character"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const userModel: Model<IUser> = mongoose.model('user', userSchema)
export default userModel