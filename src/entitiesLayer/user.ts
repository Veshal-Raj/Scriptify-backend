export interface IUser {
    name: string,
    email: string,
    password: string,
    avatar?: {
        public_id: string,
        url: string
    },
    role?: "user" | "admin",
    isVerified?: boolean,
}