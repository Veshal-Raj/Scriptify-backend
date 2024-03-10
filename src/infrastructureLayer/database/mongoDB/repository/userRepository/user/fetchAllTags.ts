// import UserModel from "../../../models/userModel";
import BlogModel from "../../../models/blogModel";



export const fetchAllTags = async (blogModels: typeof BlogModel) => {
    try {
        const tags = await blogModels.aggregate([
            { $unwind: "$tags" }, // Split the array into separate documents for each tag
            { $group: { _id: "$tags" } }, // Group by tags to remove duplicates
            { $project: { _id: 0, tag: "$_id" } }, // Project to rename "_id" to "tag"
        ]);
        console.log(tags)
        return tags.map((tag: { tag: string }) => tag.tag); // Extract the "tag" field from each document
    } catch (error) {
        console.error(error);
        throw error;
    }
};