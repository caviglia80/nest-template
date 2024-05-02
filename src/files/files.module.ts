import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [FilesController],
  providers: [FilesService, CloudinaryProvider],
  imports: [
    ConfigModule
  ]
})
export class FilesModule { }
