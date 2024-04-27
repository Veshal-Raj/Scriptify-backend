import mongoose, { Model, Schema } from "mongoose";
import { IBlog } from "../../../../entitiesLayer/blog";

const blogSchema: Schema = new Schema<IBlog>(
    {
        blog_id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        banner: {
            type: String,
        },
        des: {
            type: String,
            maxlength: 200,
        },
        content: {
            type: [],
        },
        tags: {
            type: [String],
        },
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        activity: {
            total_likes: {
                type: Number,
                default: 0
            },
            total_comments: {
                type: Number,
                default: 0
            },
            total_reads: {
                type: Number,
                default: 0
            },
            total_parent_comments: {
                type: Number,
                default: 0
            },
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'Comment'
        },
        draft: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: 'publishedAt'
        }
    }
);

const BlogModel: Model<IBlog> = mongoose.model<IBlog>("Blog", blogSchema);

export default BlogModel;