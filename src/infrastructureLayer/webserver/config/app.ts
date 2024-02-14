require("dotenv").config()
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
// import errorHandler from '../../../usecasesLayer/handler/errorHandler'
require('dotenv').config()

//routes
// import { userRoute } from '../routes/userRoute'

export const app = express()

// app.use(cors({
//     origin: "*",
//     credentials: true
// }))

app.use(cors({ origin: process.env.CLIENT_SERVER, credentials: true }));
// app.options('/api/v1/user/register', cors());
console.log('reached inside app.ts iniside webserver')

app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))

// app.use('/api/v1/user/', userRoute(express.Router()))

// app.use(errorHandler)