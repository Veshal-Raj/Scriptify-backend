import { Router, Request, Response, NextFunction, Express } from "express";
import { Logger } from "../services/errorLogging";

export type Req = Request;
export type Res = Response;
export type Next = NextFunction;

export type serverPackage = Express;
export type Route = Router
export type Ilogger = typeof Logger