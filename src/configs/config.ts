import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: Number(process.env.PORT),
    HOST: process.env.HOST,
    MONGO_URL: process.env.MONGO_URL,

    HASH_ROUNDS: Number(process.env.HASH_ROUNDS),

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,



    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUKET,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_BUKET_URL: process.env.AWS_S3_BUKET_URL,

    PRIVATE_BANK_API: process.env.PRIVATE_BANK_API
};