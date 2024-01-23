import { ObjectId } from "mongoose";

interface Blog {
    _id: ObjectId;
  Title: string | null;
  Content: string | null;
  Author_id: ObjectId | null;
  Total_likes: number | null;
  Total_comments: number | null;
  Description: string | null;
  Tags: string | null;
  Total_reads: number | null;
  Comments: ObjectId | null;
}

export default Blog;