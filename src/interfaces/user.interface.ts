import { RoleEnum } from "../enums/role.enum";


export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: RoleEnum;
    subscription: string;
    avatar: string;
    isDeleted: boolean;
    isVerified: boolean;
}
export interface IPublicUser {
    _id: string;
    name: string;
    email: string;
    role: RoleEnum;
    avatar: string;
    isDeleted: boolean;
    isVerified: boolean;
}

export interface IPrivateUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: RoleEnum;
    avatar: string;
    isDeleted: boolean;
    isVerified: boolean;
}

export interface UserDocument extends IUser, Document {}