import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { FileController } from '../controllers/file.controller';
import { celebrate, Joi, Segments } from 'celebrate';
import path from 'path';

// Set up multer with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const route = Router();

export default (app: Router) => {
    app.use('/files', route);

    route.post(
        '/upload',
        upload.single('file'), 
        celebrate({
            [Segments.BODY]: Joi.object({
                description: Joi.string().optional(),
                type: Joi.string().required(),
                category: Joi.string().required()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            const response = await FileController.uploadFile(req, res, next);
            return res.status(200).json(response);
        },
    );
};



//upload file in original name and extension

// import { NextFunction, Request, Response, Router } from 'express';
// import multer from 'multer';
// import { FileController } from '../controllers/file.controller';
// import { celebrate, Joi, Segments } from 'celebrate';
// import logger from '../../common/logger';
// import path from 'path';

// const route = Router();

// // Save files temporarily in the 'uploads' folder
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); 
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//     },
// });

// const upload = multer({ storage });

// export default (app: Router) => {
//     app.use('/files', route);

//     route.post(
//         '/upload',
//         upload.single('file'), 
//         celebrate({
//             [Segments.BODY]: Joi.object({
//                 description: Joi.string().optional(),
//             }),
//         }),
//         async (req: Request, res: Response, next: NextFunction) => {
//             const response = await FileController.uploadFile(req, res, next);
//             return res.status(200).json(response);
//         },
//     );
// };

