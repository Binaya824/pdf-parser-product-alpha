import UploadModel, { IUpload } from '../models/upload.model';
import mongoose, { Types } from 'mongoose';

class UploadDao {
  // Create a new upload (file blob)
  async createUpload(data: Buffer, metadata: { fileType: string; fileExtension: string; fileSize: number }): Promise<IUpload> {
    const upload = new UploadModel({
      data,
      metadata,
    });
    return upload.save();
  }

  // Find an upload by its ID
  async findUploadById(id: mongoose.Types.ObjectId): Promise<IUpload | null> {
    return UploadModel.findById(id).exec();
  }

  // Delete an upload by its ID
  async deleteUploadById(id: mongoose.Types.ObjectId): Promise<IUpload | null> {
    return UploadModel.findByIdAndDelete(id).exec();
  }

  /**
   * 
   * This also should delete the document
 
  // Update an upload's metadata by its ID
  async updateMetadataById(
    id: mongoose.Types.ObjectId,
    metadata: { fileType?: string; fileExtension?: string; fileSize?: number }
  ): Promise<IUploads | null> {
    return UploadModel.findByIdAndUpdate(id, { $set: { metadata } }, { new: true }).exec();
  }
 
 */

}

export default UploadDao;
