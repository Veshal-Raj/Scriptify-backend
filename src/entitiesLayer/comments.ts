
// Define interface for the comment
interface IComment  {
    blog_id: any;
    blog_author: any;
    comment: string;
    children: any[];
    commented_by: any;
    isReply?: boolean;
    parent?: any;
    commentedAt: Date;
}


export default IComment