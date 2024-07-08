import {IPrivateUser, IPublicUser, IUser} from "../interfaces/user.interface";
import {configs} from "@typescript-eslint/eslint-plugin";

export class UserPresenter {
    public static toPublicResponseDto(user: IUser): IPublicUser  {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar ? `${configs.AWS_S3_ENDPOINT}/${user.avatar}` : null,
            isDeleted: user.isDeleted,
            isVerified: user.isVerified,
        };
    }
    public static toPublicResponseListDto(users: IUser[]): IPublicUser[] {
        return users.map(UserPresenter.toPublicResponseDto);
    }

    public static toPrivateResponseDto(user: IUser): IPrivateUser {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar ? `${configs.AWS_S3_ENDPOINT}/${user.avatar}` : null,
            isDeleted: user.isDeleted,
            isVerified: user.isVerified,
        };
    }
}