import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";
import { userService } from "../services/user.service";


class CommonMiddleware {
    public isIdValid(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.userId;
            if (!isObjectIdOrHexString(id)) {
                throw new ApiError("Invalid id", 400);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public isBodyValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(e);
            }
        };
    }

   public userInfoMiddleware = async (req, res, next) => {
        try {
            const userInfo = await userService.getUserInfo(req);
            req.userInfo = userInfo;
        //    console.log(userInfo)
        } catch (error) {
            console.error(error);
        } finally {
            next();
        }
    };
}
export const commonMiddleware = new CommonMiddleware();