import ReportModel from "../../../models/reportModel";

export const reportBlogbyUser = async (
  blog_id: string,
  reason: string,
  reportedBy: string
) => {
  try {
    // Create a new report document
    const newReport = new ReportModel({
      blog_id: blog_id,
      reportedBy: reportedBy,
      reason: reason,
    });

    // Save the report to the database
    const savedReport = await newReport.save();

    return savedReport;
  } catch (error) {
    throw error;
  }
};
