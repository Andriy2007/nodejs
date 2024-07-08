import { Dayjs } from "dayjs";

import { dayjsService } from "../services/dayjs.service";
import { IViews } from "../interfaces/views.interface";
import { Views } from "../models/view.model";

class ViewsRepository {
    public async create(postId: string): Promise<IViews> {
        return await Views.create({ postId });
    }
    public async viewCount(previousTime: Dayjs, postId: string): Promise<number> {
        const currentTime = dayjsService.currentTime();
        return await Views.countDocuments ({createdAt: { $gte: previousTime, $lte: currentTime }, postId,});
    }
}

export const viewsRepository = new ViewsRepository();