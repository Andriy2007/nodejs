import { PutObjectCommand, S3Client,} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";
import path from "path";


import { FileItemTypeEnum } from "../enums/file-type.enum";
import {config} from "../configs/config";

class S3Service {
    constructor(
        private readonly client = new S3Client({
            region: "eu-north-1",
            credentials: {
                accessKeyId: config.AWS_S3_ACCESS_KEY,
                secretAccessKey: config.AWS_S3_SECRET_KEY,
            },
        }),
    ) {}

    public async uploadFile(
        file: UploadedFile,
        itemType: FileItemTypeEnum,
        itemId: string,
    ): Promise<string> {
        try {
            const filePath = this.buildPath(itemType, itemId, file.name);
            await this.client.send(
                new PutObjectCommand({
                    Bucket: config.AWS_S3_BUCKET_NAME,
                    Key: filePath,
                    Body: file.data,
                    ContentType: file.mimetype,
                    ACL: "public-read",
                }),
            );
            return filePath;
        } catch (error) {
            console.error("Error upload: ", error);
        }
    }

    private buildPath(
        itemType: FileItemTypeEnum,
        itemId: string,
        fileName: string,
    ): string {
        return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`; // use only  template string
    }
}

export const s3Service = new S3Service();