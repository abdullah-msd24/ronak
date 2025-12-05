import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/config/cloudinary.config';
import { FileUpload } from 'graphql-upload';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file;
    const stream = createReadStream();

    const uploadResult = await this.cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id: `ronak/${filename}`,
      },
      (error, result) => {
        if (error) {
          throw new Error('File upload failed');
        }
        return result;
      }
    );

    return new Promise((resolve, reject) => {
      stream
        .pipe(uploadResult)
        .on('finish', () => resolve(uploadResult.secure_url))
        .on('error', (error) => reject(error));
    });
  }
}