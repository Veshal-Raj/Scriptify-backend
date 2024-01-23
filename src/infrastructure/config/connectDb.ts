import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        const MONOG_URL = 'mongodb://127.0.0.1:27017/clean'
        await mongoose.connect(MONOG_URL)
        console.log('connected to db')
    } catch (error) {
        console.error(error);
        
    }
}