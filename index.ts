import {createServer} from './src/infrastructure/config/app'
import {connectDb} from './src/infrastructure/config/connectDb'

const startServer = async ()=> {
    try {
        await connectDb()
        const app = createServer()
        app?.listen(5000, () => {
            console.log('Server is running at 5000')
        })
    } catch (error) {
        console.error(error);
        
    }
}

startServer()