import UploadModel from '../models/upload.model';
import UserDocumentModel, { IUserDocument } from '../models/userDocument.model';
import mongoose, { Types } from 'mongoose';

class UserDocumentDao {
    // Create a new user document
    async createUserDocument(data: Partial<IUserDocument>): Promise<IUserDocument> {
        const userDocument = new UserDocumentModel(data);
        return userDocument.save();
    }

    // Find a user document by its ID
    async findUserDocumentById(id: mongoose.Types.ObjectId): Promise<IUserDocument | null> {
        return UserDocumentModel.findById(id).exec();
    }

    // Find all user documents by userId
    async findUserDocumentsByUserId(userId: mongoose.Types.ObjectId): Promise<IUserDocument[]> {
        return UserDocumentModel.find({ userId }).exec();
    }

    // Update the status of a user document
    async updateUserDocumentStatus(
        id: mongoose.Types.ObjectId,
        status: 'processing' | 'processed' | 'confirmed'
    ): Promise<IUserDocument | null> {
        return UserDocumentModel.findByIdAndUpdate(id, { $set: { status } }, { new: true }).exec();
    }

    async updateUserDocumentData(
        taskId: string,
        data: JSON
    ): Promise<IUserDocument | null> {
        return UserDocumentModel.findOne({taskId}, {
            $set: {
                'documentData.data': data,
                'documentData.extractedAt': new Date(),
            }
        }, { new: true });
    }
    

    // Delete a user document by its ID
    async deleteUserDocumentById(id: mongoose.Types.ObjectId): Promise<IUserDocument | null> {
        const document = await UserDocumentModel.findById(id);
        // first delete the upload & then user document
        await UploadModel.findByIdAndDelete(document.uploadId).exec();
        return UserDocumentModel.findByIdAndDelete(id).exec();
    }
}

export default UserDocumentDao;