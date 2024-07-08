import { NextFunction, Request, Response } from "express";

import { postService } from "../services/posts.service";
import { IPost } from "../interfaces/post.interface";
import { viewsService } from "../services/views.service";



class PostsController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postService.getList();
            res.json(posts);
        } catch (e) {
            next(e);
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            const post = await postService.getById(postId);
            res.json(post);
        } catch (e) {
            next(e);
        }
    }
    public async viewCount(req: Request, res: Response, next: NextFunction,): Promise<void> {
        try {
            const { carId, day } = req.params;
            const viewCount = await viewsService.countViews(+day, carId);
            res.status(200).json({ data: { viewCount, day: +day } });
        } catch (e) {
            next(e);
        }
    }
    public async averagePrice(req: Request, res: Response, next: NextFunction,):
        Promise<Response<{ city: string; manufacture: string; avg: number }>> {
        try {
            const { manufacture, city } = req.params;
            const averagePrice = await postService.getAveragePriceByRegion(
                manufacture,
                city,
            );
            return res
                .status(200)
                .json({ data: { city, manufacture, avg: averagePrice } });
        } catch (e) {
            next(e);
        }
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            //@ts-ignore
            const userInfo = req.userInfo
            const dto = req.body.dto as Partial<IPost>;

            if(
                !userInfo?.userId || !dto
            ) {
                throw new Error("User does not exist");
            }
            const newPost = await postService.create({
                ...dto,
                _userId: userInfo?.userId,
            });
            console.log(newPost);
            res.status(201).json({  newPost });
        } catch (e) {
            next(e);
        }
    }
    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            const dto = req.body as Partial<IPost>;
            const post = await postService.updateById(postId, dto);
            res.status(201).json(post);
        } catch (e) {
            next(e);
        }
    }
    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            await postService.deleteById(postId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

export const postController = new PostsController();