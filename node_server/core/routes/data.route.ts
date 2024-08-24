import { NextFunction, Request, Response, Router } from 'express';
import getLogger from '../../common/logger';
import { DataController } from '../controllers/data.controller';
import { celebrate, Joi, Segments } from 'celebrate';

const logger = getLogger(module);
const route = Router();

export default (app: Router) => {
    app.use('/data', route);

    route
        .post(
            '/addExtractedData',
            // celebrate({
            //     [Segments.BODY]: Joi.object({
            //         data: Joi.required(),
            //         docId: Joi.string().required(),
            //     }),
            // }),
            async (req: Request, res: Response, next: NextFunction) => {
                // console.log("API point hit");
                // console.log("data", req.body)
                const response = await DataController.receiveData(req, res, next)
                
                // const response = {
                //     message: "Hello document data update success",
                //     status: 200
                // }
                return res.status(200).json(response);
            }
        )
}