import { Response } from "express";

export const errorResponse = (res: Response, statusCode = 500, message = 'Internal Server Error') => {
    res.status(statusCode).json({ message, success: false });
}

export const successResponse = (res: Response, statusCode = 200, message = 'Success', data?: any) => {
    if (data)
        res.status(statusCode).json({ message, success: true, data });
    else
        res.status(statusCode).json({ message, success: true });
}