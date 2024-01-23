import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUsers extends Document {
  _id?: ObjectId;
  Username: String;
  Password: String;
  Role?: String;
  Email : String;
  Profile_pic?: String | null;
  Blogs?: ObjectId[] | null;
  Total_posts?: Number | null;
  social_media_links?: {
     Facebook?: String | null;
     Instagram?: String | null;
     Twitter?: String | null;
     Website?: String | null;
     Youtube?: String | null;
  }[];
  Total_reads?: Number | null;
  Bio?: String | null;
  IsBlock?: Boolean;
  Following?: String | null;
  Followers?: String | null;
  Subscription?: ObjectId | null;
  HasLimit?: Boolean;
}

const UsersSchema: Schema = new Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Role: { type: String, default: 'User' },
  Email : { type: String, required: true },
  Profile_pic: { type: String },
  Blogs: [{ type: Schema.Types.ObjectId,  }],
  Total_posts: { type: Number },
  Social_media_links: [{
     Facebook: { type: String },
     Instagram: { type: String },
     Twitter: { type: String },
     Website: { type: String },
     Youtube: { type: String },
  }],
  Total_reads: { type: Number },
  Bio: { type: String },
  IsBlock: { type: Boolean, default: false },
  Following: { type: String },
  Followers: { type: String },
  Subscription: { type: Schema.Types.ObjectId },
  HasLimit: { type: Boolean,  default: true },
});

const UserModel = mongoose.model<IUsers>('Users', UsersSchema);

export default UserModel;

