import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { Types } from 'mongoose';
import { ResponseCodes } from '../../common/response/responseCodes';
import { ReturnResponseObject } from '../../common/response/responseReturn';

class UserController {
  public static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: Types.ObjectId = new Types.ObjectId(req.auth.id);
      const userService = new UserService(userId);
      const response = userService.getProfile()
      return response;
    } catch (error) {
      return ReturnResponseObject.internalServerError()
    }
  }

  public static async updateProfile(req: Request, res: Response, next: NextFunction){
    try {
      const userId: Types.ObjectId = new Types.ObjectId(req.auth.id);
			const userService = new UserService(userId);
			const response = await userService.editProfile(req.body);
			return response;
    } catch (error) {
      return ReturnResponseObject.internalServerError()
    }
  }

}


export { UserController }