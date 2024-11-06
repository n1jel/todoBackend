import { Request, Response } from "express";
import createNewUser from "services/createNewUser.service";
import { errorResponse, successResponse } from "utils/apiResponse.util";

export const registerController = async (req: Request, res: Response) => {
    try {
        let createUser = await createNewUser(res.locals.user);
        successResponse(res, createUser.statusCode, createUser.message, createUser.data);
    } catch (e) {
        if (e instanceof Error) {
            let errMsg = e.message.split('Error: ').pop();
            if (errMsg === 'Username already exists') {
                errorResponse(res, 400, errMsg);
            } else {
                errorResponse(res);
            }
        } else {
            errorResponse(res);
        }
    }
}