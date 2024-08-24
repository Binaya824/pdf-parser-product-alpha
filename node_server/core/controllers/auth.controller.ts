import { NextFunction, Request, Response } from 'express';
import getLogger from '../../common/logger';
import Container from 'typedi';
import { AuthService } from '../services/auth.service';
import { ReturnResponseObject } from '../../common/response/responseReturn';

const logger = getLogger(module);

class AuthController {
	public static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const authService = new AuthService();
			const response = await authService.login({
				email: req.body.email,
				password: req.body.password,
			});
			return response;
		} catch (error) {
			return ReturnResponseObject.internalServerError();
		}
	}
	public static async register(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const authService = new AuthService();
			const response = await authService.register({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				phone: req.body.phone ,
				company: req.body.company,
				userType: req.body.userType,
				region: req.body.region,
			});
			return response;
		} catch (error) {
			return ReturnResponseObject.internalServerError();
		}
	}
	
	
	  public static async verifyOTP(req: Request, res: Response, next: NextFunction) {
		try {
		  const authService = new AuthService();
		  const response = await authService.verifyOTP(
			req.body.email, 
			req.body.otpId,  
			req.body.otp,   
			req.body.newPassword // Ensure newPassword is provided
		);
		
		  return response;
		} catch (error) {
		  return ReturnResponseObject.internalServerError();
		}
	  }
	  public static async forgetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const authService = new AuthService();
            const response = await authService.forgetPassword(req.body.email);
            return response;
        } catch (error) {
            return ReturnResponseObject.internalServerError();
        }
    }
	  
	
}

export { AuthController };
