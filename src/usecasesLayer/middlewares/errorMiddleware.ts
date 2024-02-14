import { Next, Req, Res } from "../../infrastructureLayer/types/serverPackageTypes";
import {ErrorHandler} from "./errorHandler";
import winston from 'winston';
import moment from 'moment';
import path from 'path'; 



// Define Winston logger configuration


const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.errors({ stack: true }), // Include stack traces for errors
    winston.format.printf(info => {
      // Format timestamp using moment
      const formattedTimestamp = moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss');

      return `Time: ${formattedTimestamp},\ninfo level: ${info.level},\ninfo message: ${info.message},\ninfo stack: ${info.stack || 'info stack not found'}\n`;
    })
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(__dirname, './../../log', 'error.log'), 
      level: 'error'
    }), // Log errors to error.log file
    new winston.transports.Console() // Also log errors to console for debugging
  ]
});




export const errorMiddleWare = (err: any, req: Req, res: Res, next: Next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    
    // Log stack trace
    console.error('stack trace',err.stack);

     // Log error using Winston
  logger.error(err.message, { error: err });

    console.log('inside error middleware')
    console.error(err)


    //wrong mongoDb id
  if (err.name === "castError") {
    const message = `Resource not found, invalid:${err.path}`;
    err = new ErrorHandler(400, message);
  }
  //duplicate key error =>for authentication
  if (err.name === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(400, message);
  }
  //wrong jwt error
  if (err.name === "jsonWebTokenError") {
    const message = `json web token is invalid,try again`;
    err = new ErrorHandler(400, message);
  }
  //token expired error
  if (err.name === "TokenExpiredError") {
    const message = `json web token has expired`;
    err = new ErrorHandler(400, message);
  }
  // if (err instanceof ErrorHandler) {
  //   res.status(err.statusCode).json({
  //     success: false,
  //     status: err.statusCode,
  //     message: err.message,
  //   });
  // }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}