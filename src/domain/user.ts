import { ObjectId } from "mongoose";

interface User {
    _id: ObjectId;
  Username: string;
  Email: string;
  Password: string;
  Role: 'Admin' | 'User'; // Assuming 'Admin' or 'User' are the only valid roles
  Profile_pic: string | null;
  Blogs: ObjectId[] | null;
  Total_posts: number | null;
  Total_reads: number | null;
  Bio: string | null;
  social_media_links: {
    Facebook: string | null;
    Instagram: string | null;
    Twitter: string | null;
    Website: string | null;
    Youtube: string | null;
  }[];
  IsBlock: boolean;
  Followers: string | null;
  Following: string | null;
  Subscription: ObjectId | null;
  HasLimit: boolean;

}

export default User;