import mongoose, { Model, Schema } from "mongoose";
import IComment from "../../../../entitiesLayer/comments";

const commentSchema: Schema<IComment> = new Schema<IComment>({
    blog_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    blog_author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Blog',
    },
    comment: {
        type: String,
        required: true
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    commented_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isReply: {
        type: Boolean,
        default: false
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, {
    timestamps: {
        createdAt: 'commentedAt'
    }
});

// Create and export model
const CommentModel: Model<IComment> = mongoose.model<IComment>("Comment", commentSchema);
export default CommentModel;