import ReportModel from "../../../models/reportModel"

export const reportBlogbyUser = async (
    blog_id: string,
    reason: string,
    reportedBy: string
) => {
    try {
        console.log('reached inside the report ')
        console.log('blog_id', blog_id)
        console.log('reason', reason)
        console.log('reportedBy', reportedBy)
         // Create a new report document
         const newReport = new ReportModel({
            blog_id: blog_id,
            reportedBy: reportedBy,
            reason: reason
        });

        // Save the report to the database
        const savedReport = await newReport.save();
        console.log('Saved report:', savedReport);

        return savedReport

    } catch (error) {
        throw error
    }
}