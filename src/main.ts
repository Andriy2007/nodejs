import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import fileupload from "express-fileupload";

import { config } from "./configs/config";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import { postRouter } from "./routers/posts.router";
import { statisticRouter } from "./routers/statistics.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/statistics", statisticRouter);

app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        return res.status(err.status || 500).json(err.message);
    },
);
process.on("uncaughtException", (error) => {
    console.error("uncaughtException: ", error);
    process.exit(1);
});

app.listen(config.PORT, "0.0.0.0", async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log(`Server is running at http://${config.HOST}:${config.PORT}/`);
});