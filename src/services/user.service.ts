import { Request } from "express";
import {UploadedFile} from "express-fileupload";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { parseToken } from "../helpers/parseJWTToken";
import { s3Service } from "./s3.service";
import { FileItemTypeEnum } from "../enums/file-type.enum";

class UserService {
    public async getList(): Promise<IUser[]> {
        return await userRepository.getList();
    }
    public async getById(userId: string): Promise<IUser> {
        return await this.findUserOrThrow(userId);
    }
    public async getMe(userId: string): Promise<IUser> {
        return await this.findUserOrThrow(userId);
    }
    public async create(dto: Partial<IUser>): Promise<IUser> {
        return await userRepository.create(dto);
    }
    public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
        await this.findUserOrThrow(userId);
        return await userRepository.updateById(userId, dto);
    }
    public async deleteById(userId: string): Promise<void> {
        await this.findUserOrThrow(userId);
        return await userRepository.deleteById(userId);
    }
    public async uploadAvatar(userId: string, avatar: UploadedFile,): Promise<IUser> {
        const user = await this.findUserOrThrow(userId);
        console.log(user)
        const filePath = await s3Service.uploadFile(
            avatar,
            FileItemTypeEnum.USER,
            user._id,
        );
        if (user.avatar) {
            // TODO: delete old avatar
        }
        return await userRepository.updateById(userId, { avatar: filePath });
    }
    public async getUserInfo(req: Request): Promise<void> {
        if (!req) {
            return;
        }
        const accessToken = req.header('Authorization');
        if (!accessToken) {
            return;
        }
        const jwtPayload = parseToken(accessToken);
        return jwtPayload;

    }
    private async findUserOrThrow(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("user not found", 404);
        }
        return user;
    }
}

export const userService = new UserService();