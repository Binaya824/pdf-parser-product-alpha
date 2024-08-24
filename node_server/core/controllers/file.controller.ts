import { Request, Response, NextFunction } from 'express';
import { ResponseCodes } from '../../common/response/responseCodes';
import { ReturnResponseObject } from '../../common/response/responseReturn';
import { FileService } from '../services/file.service';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

export class FileController {
    static async uploadFile(req: Request, res: Response, next: NextFunction) {
        if (!req.file) {
            return res.status(ResponseCodes.UPLOAD_FAILED.code).json(ResponseCodes.UPLOAD_FAILED);
        }
        // Ensure the 'uploads' folder exists
        const uploadsFolder = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadsFolder)) {
            fs.mkdirSync(uploadsFolder, { recursive: true });
        }

        const docType = req.body.type;
        const docCategory = req.body.category;

        try {
            // Call the service to handle file processing
            const result = await FileService.processFile(req.file,  new mongoose.Types.ObjectId(req.auth.id), docType, docCategory );
            return result
            
        } catch (error) {
            console.error("Error processing file:", error);
            return ReturnResponseObject.internalServerError()
         }
    }
}