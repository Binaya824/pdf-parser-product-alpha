import mongoose, { Schema, Document } from 'mongoose';

// Define the FileBlob interface
export interface IUpload extends Document {
  data: Buffer; // Blob data stored as a buffer
  metadata: {
    fileType: string;
    fileExtension: string;
    fileSize: number;
  };
}

// Define the FileBlob schema
const UploadSchema: Schema<IUpload> = new Schema({
  data: {
    type: Buffer,
    required: true,
  },
  metadata: {
    fileType: {
      type: String,
      required: true,
      trim: true,
    },
    fileExtension: {
      type: String,
      required: true,
      trim: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
  },
}, {
  timestamps: true,
});

// Create and export the FileBlob model
const UploadModel = mongoose.model<IUpload>('Upload', UploadSchema);

export default UploadModel;
