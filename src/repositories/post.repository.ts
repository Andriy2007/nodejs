import {IPost} from "../interfaces/post.interface";
import {Post} from "../models/post.model";
import {dayjsService} from "../services/dayjs.service";
import {Dayjs} from "dayjs";

class PostRepository {
    public async getList(): Promise<IPost[]> {
        return await Post.find({});
    }
    public async create(dto: Partial<IPost>): Promise<IPost> {
        return await Post.create(dto);
    }
    public async getByPostId(postId: string): Promise<IPost> {
        return await Post.findById(postId);
    }

    public async updateById(postId: string, dto: Partial<IPost>): Promise<IPost> {
        return await Post.findByIdAndUpdate(postId, dto, {returnDocument: "after",});
    }
    public async deleteById(userId: string): Promise<void> {
        await Post.deleteOne({ _id: userId });
    }
    public async getFindCountPostById(userId: string): Promise<number> {
        return await Post.countDocuments({ _userId: userId });
    }

    public async getCountPostByData(
        previousTime: Dayjs,
        _userId: string,
    ): Promise<number> {
        const currentTime = dayjsService.currentTime();
        const createdAt = { $gte: previousTime, $lte: currentTime };
        const countPostParams = { createdAt, _userId, status };
        return await Post.countDocuments(countPostParams);
    }

    public async getAveragePriceByRegion(
        manufacture: string,
        city: string,
    ): Promise<number> {
        const cityOrAllUkraine = city === "all" ? {} : { city };
        const [averagePriceByRegion] = await Promise.all([
            Post.aggregate([
                {
                    $match: { $and: [{ ...cityOrAllUkraine }, { manufacture }] },
                },
                {
                    $group: {
                        _id: "$city",
                        averagePrice: { $avg: "$price" },
                    },
                },
            ]),
        ]);

        return averagePriceByRegion.length > 0
            ? averagePriceByRegion[0].averagePrice
            : 0;
    }
}

export const postRepository = new PostRepository();