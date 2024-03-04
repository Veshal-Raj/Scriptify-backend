import { Document,  Types } from "mongoose";

interface IBlog extends Document {
    blog_id: string;
    title: string;
    banner?: string;
    des?: string;
    content?: any[]; // You might want to replace any[] with a more specific type
    tags?: string[];
    author: Types.ObjectId;
    activity: {
        total_likes: number;
        total_comments: number;
        total_reads: number;
        total_parent_comments: number;
    };
    comments?: Types.ObjectId[];
    draft: boolean;
    publishedAt: Date;
}

export { IBlog };
