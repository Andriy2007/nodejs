import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import { fileMiddleware } from "../middlewares/file.middleware";


const router = Router();
router.use(commonMiddleware.userInfoMiddleware)
router.get("/",  userController.getList);
router.post("/", userController.create);
router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.get("/:userId",  commonMiddleware.isIdValid, userController.getById);
router.put("/:userId",   authMiddleware.checkAccessToken, commonMiddleware.isBodyValid(UserValidator.update), commonMiddleware.isIdValid, userController.updateById,);
router.delete("/:userId",  commonMiddleware.isIdValid, userController.deleteById,);
router.post("/me/avatar", authMiddleware.checkAccessToken, fileMiddleware.isAvatarValid, userController.uploadAvatar,);

export const userRouter = router;