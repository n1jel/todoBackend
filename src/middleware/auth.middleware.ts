import User from "entities/user.entity";
import { NextFunction, Request, Response } from "express";
import { userLoginSchemaZod, userSchemaZod } from "schemas/user.schema";
import { errorResponse } from "utils/apiResponse.util";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "config/envVars.config";

export const registerUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const validation = userSchemaZod.safeParse(req.body);
    if (validation.error) {
        errorResponse(res, 400, validation.error.errors[0].message);
        return;
    }
    res.locals.user = validation.data;
    next();
}

export const loginUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const validation = userLoginSchemaZod.safeParse(req.body);
    if (validation.error) {
        errorResponse(res, 400, validation.error.errors[0].message);
        return;
    }
    next();
}

export const userAlreadyExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        errorResponse(res, 400, 'Username already exists');
        return;
    }
    next();
}

export const doesUserExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ username: req.body.username });

    if (!user) {
        errorResponse(res, 401, 'User not found');
        return;
    }
    res.locals.user = user;
    next();
}

export const isPasswordValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userInDb = res.locals.user
    const loginCred = req.body;

    const isPasswordCorrect = await bcrypt.compare(loginCred.password, userInDb.password);
    if (!isPasswordCorrect) {
        errorResponse(res, 401, 'Password is incorrect');
        return;
    }
    next();
}

export interface decodedToken extends JwtPayload {
    userId: string;
    username: string;
}

export const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
        errorResponse(res, 401, 'Token is required');
        return;
    }

    const token = tokenWithBearer.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, envVars.JWTSECRET as string);
        if (!decodedToken) {
            errorResponse(res, 401, 'Token is invalid');
            return;
        }

        let payload = decodedToken as decodedToken;
        res.locals.userId = payload.userId;
        next();
    } catch (e) {
        errorResponse(res, 401, 'Token is invalid');
        return;
    }
}