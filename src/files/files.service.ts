// import { existsSync } from 'fs';
// import { join } from 'path';

// import { Injectable, BadRequestException } from '@nestjs/common';


// @Injectable()
// export class FilesService {

//     getStaticProductImage( imageName: string ) {

//         const path = join( __dirname, '../../static/products', imageName );

//         if ( !existsSync(path) ) 
//             throw new BadRequestException(`No product found with image ${ imageName }`);

//         return path;
//     }


// }


import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {

    async getStaticProductImage(imageName: string): Promise<string> {
        const path = join(__dirname, '../../static/products', imageName);

        try {
            // Verifica si el archivo existe de manera asincrónica
            await fsPromises.access(path);
            return path;
        } catch (error) {
            throw new NotFoundException(`No product found with image ${imageName}`);
        }
    }
}
