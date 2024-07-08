import { UserDocument } from './user.model'; // Підключаємо тип UserDocument з вашого модуля

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserDocument; // Додаємо властивість user до типу Request
    }
}