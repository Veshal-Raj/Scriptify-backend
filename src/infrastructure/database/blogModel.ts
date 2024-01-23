import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IPosts extends Document {
  _id: ObjectId;
  Title: String | null;
  Description: String | null;
  Content: String | null;
  Total_comments: Number | null;
  Author_id: ObjectId | null;
  Total_likes: Number | null;
  Total_reads: Number | null;
  Comments: ObjectId | null;
  Tags: String | null;
}

const PostsSchema: Schema = new Schema({
  Title: { type: String },
  Description: { type: String },
  Content: { type: String },
  Total_comments: { type: Number },
  Author_id: { type: Schema.Types.ObjectId },
  Total_likes: { type: Number },
  Total_reads: { type: Number },
  Comments: { type: Schema.Types.ObjectId },
  Tags: { type: String },
});

const Posts = mongoose.model<IPosts>('Posts', PostsSchema);

export default Posts;

