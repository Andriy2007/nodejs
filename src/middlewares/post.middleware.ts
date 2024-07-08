import { NextFunction, Request, Response } from "express";

import {ApiError} from "../errors/api-error";
import {postService} from "../services/posts.service";
import {IUser} from "../interfaces/user.interface";

class PostMiddleware {
    public async countCar(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { _id, subscription  } = req.res.locals.user as IUser;

            if (!subscription) {
                const countCars = await postService.getFindCountPostById(String(_id));
                if (countCars >= 1) {
                    throw new ApiError(
                        "Without a subscription account, you can add only one advertisement",
                        403,
                    );
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();