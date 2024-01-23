import { ObjectId } from "mongoose";

interface Comments {
    _id: ObjectId;
  Blog_id: ObjectId;
  Blog_author: ObjectId;
  Comment: string;
  Comment_by: ObjectId;
}

export default Comments;