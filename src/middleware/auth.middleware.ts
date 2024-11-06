import User from "entities/user.entity";
import { NextFunction, Request, Response } from "express";
import { userLoginSchemaZod, userSchemaZod } from "schemas/user.schema";
import { errorResponse } from "utils/apiResponse.util";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "config/envVars.config";
import appError from "config/apperror.config";
import { StatusCodes } from "http-status-codes";

export const registerUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validation = userSchemaZod.safeParse(req.body);
        if (validation.error) {
            next(validation.error);
            return;
        }
        res.locals.user = validation.data;
        next();
    } catch (e) {
        next(e);
    }
}

export const loginUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validation = userLoginSchemaZod.safeParse(req.body);
        if (validation.error) {
            next(validation.error);
            return;
        }
        next();
    } catch (e) {
        next(e);
    }
}

export const userAlreadyExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            throw appError(StatusCodes.BAD_REQUEST, 'Username already exists')
        }
        next();
    } catch (e) {
        next(e)
    }
}

export const doesUserExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await User.findOne({ username: req.body.username });

        if (!user) {
            throw appError(StatusCodes.UNAUTHORIZED, 'User not found');
        }
        res.locals.user = user;
        next();
    } catch (e) {
        next(e);
    }

}

export const isPasswordValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInDb = res.locals.user
        const loginCred = req.body;

        const isPasswordCorrect = await bcrypt.compare(loginCred.password, userInDb.password);
        if (!isPasswordCorrect) {
            throw appError(StatusCodes.UNAUTHORIZED, 'Password is incorrect')
        }
        next();
    } catch (e) {
        next(e)
    }
}

export interface decodedToken extends JwtPayload {
    userId: string;
    username: string;
}

export const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenWithBearer = req.headers.authorization;

        if (!tokenWithBearer) {
            throw appError(StatusCodes.UNAUTHORIZED, 'Token is required');
        }

        const token = tokenWithBearer.split(' ')[1];
        const decodedToken = jwt.verify(token, envVars.JWTSECRET as string);
        if (!decodedToken) {
            throw appError(StatusCodes.UNAUTHORIZED, 'Token is invalid');
        }

        let payload = decodedToken as decodedToken;
        res.locals.userId = payload.userId;
        next();
    } catch (e) {
        next(e)
    }
}