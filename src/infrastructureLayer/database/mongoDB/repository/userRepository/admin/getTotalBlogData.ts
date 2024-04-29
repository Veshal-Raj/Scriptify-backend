import BlogModel from "../../../models/blogModel";


export const getTotalBlogData = async () => {
    try {
        const blogData = await BlogModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalBlogs: { $sum: 1 },
                    totalViews: { $sum: "$activity.total_reads" },
                    totalLikes: { $sum: "$activity.total_likes" },
                    totalComments: { $sum: "$activity.total_comments" }
                }
            }
        ]);
       

        if (blogData.length > 0) {
            return {
                totalBlogs: blogData[0].totalBlogs,
                totalViews: blogData[0].totalViews,
                totalLikes: blogData[0].totalLikes,
                totalComments: blogData[0].totalComments
            };
        } else {
            // No blogs found
            return {
                totalBlogs: 0,
                totalViews: 0,
                totalLikes: 0,
                totalComments: 0
            };
        }
    } catch (error) {
        throw error
    }
}