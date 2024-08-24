import { Logger } from 'winston';
import getLogger from '../../common/logger';
import UserDocumentDao from '../daos/userDocumentDao';
import { Types } from 'mongoose';

class DataService {
    private logger: Logger;

    constructor() {
        this.logger = getLogger(module);
    }

    public async addExtractedData(taskId: string, data: JSON): Promise<any> {
        try {
            const userDocumentDao = new UserDocumentDao();

            // Attempt to update the document data
            const updatedDocument = await userDocumentDao.updateUserDocumentData(taskId, data);
            
            // Edge Case: Document not found
            if (!updatedDocument) {
                this.logger.warn(`Document with task ID ${taskId} not found`);
                return {
                    status: 404,
                    message: "Document not found",
                };
            }

            // Edge Case: Document update failed
            if (!updatedDocument.documentData || !updatedDocument.documentData.data) {
                this.logger.error(`Document data update failed for task id ${taskId}`);
                return {
                    status: 500,
                    message: "Failed to update document data",
                };
            }

            // Success Case: Document found and updated successfully
            return {
                status: 200,
                message: "Document data updated successfully",
                data: updatedDocument,
            };
        } catch (error) {
            // General error handling
            this.logger.error(`Error encountered: ${JSON.stringify(error)}`);
            return {
                status: 500,
                message: "An error occurred while updating the document",
                error: error.message || error,
            };
        }
    }
}

export { DataService };
