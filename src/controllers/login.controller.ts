import { Request, Response } from "express";
import loginUser from "services/loginUser.service";
import { errorResponse, successResponse } from "utils/apiResponse.util";

export const loginController = async (req: Request, res: Response) => {
    try {
        let user = res.locals.user;
        let loginUserResponse = await loginUser(user.username, user._id);
        if (loginUserResponse.success) {
            let data = { token: loginUserResponse.token, userData: user };
            successResponse(res, loginUserResponse.statusCode, loginUserResponse.message, data)
        } else {
            errorResponse(res);
        }
    } catch (e) {
        if (e instanceof Error) {
            errorResponse(res, 404, e.message);
        } else {
            errorResponse(res);
        }
    }
}