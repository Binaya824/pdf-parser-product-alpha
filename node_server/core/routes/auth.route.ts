import { NextFunction, Request, Response, Router } from 'express';
import getLogger from '../../common/logger';
import { celebrate, Joi, Segments } from 'celebrate';
import { AuthController } from '../controllers/auth.controller';

const logger = getLogger(module);
const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route
        .post(
            '/login',
            celebrate({
                [Segments.BODY]: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                }),
            }),
            async (req: Request, res: Response, next: NextFunction) => {
                const response = await AuthController.login(req, res, next);
                return res.status(200).json(response);
            }
        )
        .post(
            '/register',
            celebrate({
                [Segments.BODY]: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    phone: Joi.string().required().min(10) ,
                    password: Joi.string().required(),
                    company: Joi.string().optional(),
                    userType: Joi.string().valid('student', 'developer', 'user').default('user'),
                    region: Joi.string().optional(),
                }),
            }),
            async (req: Request, res: Response, next: NextFunction) => {
                const response = await AuthController.register(req, res, next);
                return res.status(200).json(response);
                
            }
        )
        
        .post(
            '/verify-otp',
            celebrate({
                [Segments.BODY]: Joi.object({
                    email: Joi.string().email().required(),
                    otpId: Joi.string().required(), 
                    otp: Joi.string().required(),
                    newPassword: Joi.string().required() 
                }),
            }),
            async (req: Request, res: Response, next: NextFunction) => {
                const response = await AuthController.verifyOTP(req, res, next);
                console.log('OTP res ::',response);
                
                return res.status(200).json(response);
            }
        )
        
        .post(
            '/forget-password',
            celebrate({
                [Segments.BODY]: Joi.object({
                    email: Joi.string().email().required(),
                }),
            }),
            async (req: Request, res: Response, next: NextFunction) => {
                const response = await AuthController.forgetPassword(req, res, next);
                console.log('Forget-Pass res ::',response);
                return res.status(200).json(response);
            }
        )
        .get("/status", (req: Request, res: Response) => {
            logger.info("Someone checking status");
            res.json({
                message: "Hello",
                success: true
            });
        });
};
