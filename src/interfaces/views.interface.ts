import {IPost} from "./post.interface";
import {Types} from "mongoose";


export interface IViews extends Document {
    postId: string | IPost | Types.ObjectId;
}