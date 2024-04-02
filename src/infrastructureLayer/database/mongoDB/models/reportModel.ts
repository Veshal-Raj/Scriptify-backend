import mongoose, { Model, Schema } from "mongoose";
import { IReport } from "../../../../entitiesLayer/report";


const reportSchema: Schema = new Schema<IReport> (
    {
        blog_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Blog'
        },
        reportedBy: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        reason: {
            type: String,
            required: true
        },
    },
    {
        timestamps: {
            createdAt: 'publishedAt'
        }
    }
)

const ReportModel: Model<IReport> = mongoose.model<IReport>("Report", reportSchema)

export default ReportModel