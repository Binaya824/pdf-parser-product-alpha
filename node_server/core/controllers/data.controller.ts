import { NextFunction, Request, Response } from 'express';
import getLogger from '../../common/logger';
import Container from 'typedi';
import { AuthService } from '../services/auth.service';
import { ReturnResponseObject } from '../../common/response/responseReturn';
import { DataService } from '../services/data.service';

const logger = getLogger(module);

class DataController{
    public static async receiveData(req: Request, res: Response, next: NextFunction) {
		try {
			const authService = new AuthService();
            const dataService = new DataService();
            // const data = req.body.data;
			const {data} = req.body;
			const {status, message, result, task_id } = data;
			if (status === 200 && task_id !== "") {
				const response = await dataService.addExtractedData(task_id, data);
				// if successful then initiate socket io
				if (response.status === 200) {
					// initiate socket io to respond to client

					// then end the response of ML server
					
				}else{
                    // respond to ML server that data adding unsuccessful
					return {
						status: 400,
						message: "Failed updating data."
					};
				}
			}else{
				// failed data extraction
				return {
                    status: 400,
					message: "Failed updating data."
				};
			}
		} catch (error) {
			return ReturnResponseObject.internalServerError();
		}
	}
}

export  {DataController}