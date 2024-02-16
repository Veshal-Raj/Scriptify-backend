import { Next, Req, Res } from "../../infrastructureLayer/types/serverPackageTypes";
import { ErrorHandler } from "./errorHandler";

// import CustomLogger from "../../infrastructureLayer/services/errorLogging";

// const logger = new CustomLogger();

export const errorMiddleWare = (err: any, req: Req, res: Res, next: Next) => {
  console.log('-----------------------eror middle ware  -----------------------------------------------------------')
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    if (err.logger) console.log('error logger ', err.message)
    else console.log('nothing is inside the err.logger ')
    
    // Log error using Winston
    if (err.logger) {
      let logger = err.logger
      logger.logError(err.message, err.stack)
      logger.logInfo(err.message)
      logger.logWarning(err.message)
    }
    
    // Log stack trace
    console.error('Stack trace:', err.stack);

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

    // Return error response
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
}
