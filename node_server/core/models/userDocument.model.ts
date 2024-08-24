import mongoose, { Schema, Document } from 'mongoose';

// Define the UserDocument interface
export interface IUserDocument extends Document {
  userId: mongoose.Types.ObjectId;
  status: 'processing' | 'review' | 'approved';
  uploadId: mongoose.Types.ObjectId; // Reference to the FileBlob collection
  docType: string ,
  docCategory: string,
  taskId: string,
  documentData: {
    data: any; // Extracted data from the document
    extractedAt: Date; // The date and time when the data was extracted
  };
  uploadedAt: Date;
  lastModifiedAt: Date;
  uploadedBy?: mongoose.Types.ObjectId; // Now optional
  originalFileName: string;
  uniqueFileName: string;
}

// Define the UserDocument schema
const UserDocumentSchema: Schema<IUserDocument> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  status: {
    type: String,
    enum: [
      'processing',
      'review',
      'approved',
    ],
    required: true,
  },
  uploadId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Upload',
  },
  docType: {
    type: String,
    required: true
  } ,
  docCategory: {
    type: String,
    required: true
  },
  taskId:{
    type: String,
    required: true
  },
  documentData: {
    data: {
      type: Schema.Types.Mixed,
      required: false,
    },
    extractedAt: {
      type: Date,
      required: false,
    },
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
    default: function () {
      return this.userId;
    },
  },
  originalFileName: {
    type: String,
    required: true,
    trim: true,
  },
  uniqueFileName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt
});


// Create and export the UserDocument model
const UserDocumentModel = mongoose.model<IUserDocument>('UserDocument', UserDocumentSchema);

export default UserDocumentModel;
