import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryProvider {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadImage(file: Express.Multer.File): Promise<string> {
        // console.log(file.path);

        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
    }
}
