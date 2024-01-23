// import { ObjectId } from "mongoose";

interface User {
    _id?: string;
  Username: string;
  email: string;
  Password: string;
  Role?: string; 
  Profile_pic?: string | null;
  Blogs?: string[] | null;
  Total_posts?: number | null;
  Total_reads?: number | null;
  Bio?: string | null;
  social_media_links?: {
    Facebook?: string | null;
    Instagram?: string | null;
    Twitter?: string | null;
    Website?: string | null;
    Youtube?: string | null;
  }[];
  IsBlock?: boolean;
  Followers?: string | null;
  Following?: string | null;
  Subscription?: string | null;
  HasLimit?: boolean;

}

export default User;