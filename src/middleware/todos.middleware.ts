import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { todoCreateDataZod } from "schemas/todo.schema";
import { errorResponse } from "utils/apiResponse.util";

export const todoCreateDataCheck = (req: Request, res: Response, next: NextFunction) => {
    const validation = todoCreateDataZod.safeParse(req.body);
    if (validation.error) {
        errorResponse(res, 400, validation.error.errors[0].message);
        return;
    }
    next();
}

export const todoIdCheck = (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id || typeof req.params.id !== 'string' || req.params.id.length === 0) {
        errorResponse(res, 400, 'Todo id is required');
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        errorResponse(res, 400, 'Invalid todo ID format');
        return;
    }

    next();
}