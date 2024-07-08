import {Router} from "express";

import { commonMiddleware } from "../middlewares/common.middleware";
import { postController } from "../controllers/posts.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {PostValidator} from "../validators/post.validator";
import {isAdmin, isManager, isSeller} from "../middlewares/userrole.middleware";


const router = Router();
router.use(commonMiddleware.userInfoMiddleware)
router.get("/", postController.getList);
router.post("/", isSeller,   postController.create),(PostValidator.create);
router.get("/:postId",postController.getById,);
router.put("/:postId",isManager, authMiddleware.checkAccessToken, postController.updateById);
router.delete("/:postId",isAdmin, postController.deleteById,);

export const postRouter = router;