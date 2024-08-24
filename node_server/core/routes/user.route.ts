import { NextFunction, Request, Response, Router } from 'express';
import getLogger from '../../common/logger';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserController } from '../controllers/user.controller';

const logger = getLogger(module);
const route = Router();

export default (app: Router) => {
    app.use('/user', route);

    route
        .get(
            '/profile',
            async (req: Request, res: Response, next: NextFunction) => {
                const response = await UserController.getProfile(req, res, next);
                return res.status(200).json(response);
            }
        )
        .post(
            '/edit',
            celebrate({ 
                [Segments.BODY]: Joi.object({
                    name: Joi.string().trim().optional(),
                    email: Joi.string().email().trim().optional(),
                    company: Joi.string().trim().optional(),
                    userType: Joi.string().optional(),
                    region: Joi.string().trim().optional(),
                }).min(1) // At least one field must be provided
            }),
            async (req: Request, res: Response, next: NextFunction) => {
                const response = await UserController.updateProfile(req,res,next);
                return res.status(200).json(response);
            }
        )
};
