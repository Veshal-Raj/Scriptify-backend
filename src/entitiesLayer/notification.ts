interface INotification  {
    type: 'like' | 'comment' | 'reply';
    blog: any;
    notification_for: any;
    user: any;
    comment?: any;
    reply?: any;
    replied_on_comment?: any;
    message: any;
    seen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default INotification