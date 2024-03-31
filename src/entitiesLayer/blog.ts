
interface IBlog  {
    blog_id: string;
    title: string;
    banner?: string;
    des?: string;
    content?: any[]; // You might want to replace any[] with a more specific type
    tags?: string[];
    author: any;
    activity: {
        total_likes: number;
        total_comments: number;
        total_reads: number;
        total_parent_comments: number;
    };
    comments?: any[];
    draft: boolean;
    publishedAt: Date;
}

export { IBlog };
