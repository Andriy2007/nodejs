import { Router } from "express";

import { postController } from "../controllers/posts.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {isSub} from "../middlewares/userrole.middleware";


const router = Router();
router.get("/view/:postId/:day", isSub,authMiddleware.checkAccessToken, postController.viewCount,);
router.get("/average/:manufacture/:city", isSub, authMiddleware.checkAccessToken, postController.averagePrice,);

export const statisticRouter = router;