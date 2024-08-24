import { Request } from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import { ResponseCodes } from '../../common/response/responseCodes';
import UploadDao from '../daos/uploadDao';
import UserDocumentDao from '../daos/userDocumentDao';
import mongoose, { Document } from 'mongoose';
import axios, { AxiosResponse } from 'axios';
import config from '../../common/config';
// console.log(config.ml_server_url)
// const url = `${config.ml_server_url}/api/extract/`;
// console.log(url)
export class FileService {
	static async processFile(file: Express.Multer.File, userId: mongoose.Types.ObjectId, docType: string, docCategory: string) {
		const fileExtension = path.extname(file.originalname).toLowerCase();
		let processedFileBuffer: Buffer | undefined;
		const uploadDao = new UploadDao();
		const userDocumentDao = new UserDocumentDao();
		// get the file extension here

		if (fileExtension === '.pdf') {
			// Handle the PDF file as a buffer
			processedFileBuffer = file.buffer;

			// Check if processedFileBuffer is valid before writing to disk
			if (!processedFileBuffer) {
				throw new Error('File buffer is undefined');
			}

			// Optionally save the PDF buffer to disk
			const outputPath = path.join(
				'uploads',
				`processed-${file.originalname}`,
			);

			await fs.writeFile(outputPath, processedFileBuffer);
            console.log('Logging of file', )
			// ************* Send the file to the Django server *************
			let extractionResponse: AxiosResponse<any, any>;
			try {
				console.log('Requesting to the ML server', )
				// extractionResponse = await axios.post(`${config.ml_server_url}/api/extract/`, processedFileBuffer, {
				
				extractionResponse = await axios.post("http://127.0.0.1:6969/api/extract/", processedFileBuffer, {
					headers: {
						'Content-Type': 'application/pdf',
						'Content-Length': processedFileBuffer.length,
						'Original-Filename': file.originalname, // Optionally send the original filename
					},
				});
				console.log("Success to ml server")
				const { data } = extractionResponse;
				const { success, status } = data;
				const taskId = data.data.task_id;
				console.log("task Id", taskId)
				console.log("data", data)
				if (success && taskId !== "") {
					// save the document to the database
					const uploadedDoc: Document = await uploadDao.createUpload(processedFileBuffer, {
						fileExtension: fileExtension,
						fileSize: file.size,
						fileType: file.mimetype
					})
					const createNewUserDoc = await userDocumentDao.createUserDocument({
						userId: userId,
						status: "processing",
						uploadId: new mongoose.Types.ObjectId(uploadedDoc._id as mongoose.Types.ObjectId),
						docType,
						taskId: taskId || "",
						docCategory,
						originalFileName: file.originalname,
						uniqueFileName: file.originalname + `${Math.random() * 100}` + new Date().toString(),
					})
					return {
						status: ResponseCodes.UPLOAD_SUCCESS.code,
						message: ResponseCodes.UPLOAD_SUCCESS.message,
						data: {
							originalName: file.originalname,
							size: processedFileBuffer.length,
							document: createNewUserDoc
						},
					};
				} else {
					console.log("Document upload to ML server failed or task id can't be received")
					return {
						status: ResponseCodes.UPLOAD_FAILED.code,
						message: ResponseCodes.UPLOAD_FAILED.message,
					};
				}
			} catch (error) {
				console.error('Error sending file to Django server:', error.message);
				throw new Error('Failed to send file to Django server');
			}
		} else {
			return {
				status: ResponseCodes.UPLOAD_FAILED.code,
				message: 'Unsupported file type',
			};
		}
	}
}
