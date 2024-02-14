import { Next, Req, Res } from "../../infrastructureLayer/types/serverPackageTypes";
import {ErrorHandler} from "./errorHandler";

export const errorMiddleWare = (err: any, req: Req, res: Res, next: Next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

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