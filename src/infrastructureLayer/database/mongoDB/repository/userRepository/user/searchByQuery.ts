import BlogModel from "../../../models/blogModel";



export const searchByQuery = async(
    query:string, blogModels: typeof BlogModel 
) => {
    try {
        console.log('reached inside the repository/userRepository/user/searchbyquery');
        console.log('query --> ', query)
        const blogs = await blogModels.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Match title
                { tags: { $in: [query] } } // Match tags
            ]
        }, { title: 1, blog_id: 1 }) // Projection to retrieve only title and blog_id fields
        
        
           
        console.log(blogs)
        return blogs;
    } catch (error) {
        console.error(error);
        throw error
    }
}