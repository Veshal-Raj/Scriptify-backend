import ReportModel from "../../../models/reportModel"



export const getAllReports = async () => {
    try {
        const AllReports = await ReportModel.find().populate({
            path: 'blog_id',
            select: 'title banner blog_id author isBlocked' ,// Select specific fields from the BlogModel
            populate: { path: 'author', select: 'personal_info.username personal_info.email _id' } // Populate the author field in the blog_id object
        }).populate({
            path: 'reportedBy',
            select: 'personal_info.username _id' // Select the desired fields from UserModel for reportedBy
        });
            
    
        if (!AllReports) return null;

        console.log(AllReports)

        
        const reportsData = AllReports.map(report => {
            return {
                reportId: report._id,
                blogId: report.blog_id._id,
                blogTitle: report.blog_id.title,
                blogBanner: report.blog_id.banner,
                authorId: report.blog_id.author._id,
                authorUsername: report.blog_id.author.personal_info.username,
                authorEmail: report.blog_id.author.personal_info.email,
                reportedById: report.reportedBy._id,
                reportedByUsername: report.reportedBy.personal_info.username,
                reason: report.reason,
                isBlocked: report.blog_id.isBlocked,
                publishedAt: (report as any).publishedAt 
                
            };
        });

        console.log(reportsData);
        // Return the formatted data to send to the frontend
        return reportsData;
    } catch (error) {
        throw error
    }
}