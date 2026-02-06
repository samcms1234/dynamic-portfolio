import { Request, Response, NextFunction } from "express";

export default function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err);
    res.status(500).json({
        message: "Internal Service Error"
    });
}