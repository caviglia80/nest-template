import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryProvider } from './cloudinary.provider';

import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

import { fileFilter, fileNamer } from './helpers';

@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
    private readonly cloudinary: CloudinaryProvider
  ) { }

  @Get('product/:imageName')
  async findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ): Promise<void> {
    try {
      const path = await this.filesService.getStaticProductImage(imageName);
      res.sendFile(path);
    } catch (error) {
      res.status(404).send('Image not found');
    }
  }

  // @Post('product')
  // @UseInterceptors(FileInterceptor('file', {
  //   fileFilter: fileFilter,
  //   // limits: { fileSize: 10000 }
  // }))
  // async uploadProductImage(
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<{ secureUrl: string }> {

  //   if (!file) {
  //     throw new BadRequestException('Make sure that the file is an image');
  //   }

  //   // const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;
  //   // return { secureUrl };

  //   const secureUrl = await this.cloudinary.uploadImage(file);
  //   return { secureUrl };
  // }

  // @Post('product')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadProductImage(@UploadedFile() file: Express.Multer.File
  // ): Promise<{ secureUrl: string }> {
  //   if (!file) {
  //     throw new BadRequestException('Make sure that the file is an image');
  //   }

  //   const secureUrl = await this.cloudinary.uploadImage(file);
  //   return { secureUrl };
  // }


  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      // destination: './uploads',
      filename: fileNamer
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: fileFilter,
  }))
  async uploadProductImage(@UploadedFile() file: Express.Multer.File): Promise<{ secureUrl: string }> {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    const secureUrl = await this.cloudinary.uploadImage(file);
    return { secureUrl };
  }

}
