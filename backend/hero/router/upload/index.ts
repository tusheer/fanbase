import express from 'express';
import uploader from '../../utils/upload';
import { singleImageUploadController } from '../../controller/upload';
import errorHandler from '../../middleware/errorHandler';

const uploadRouter = express();

uploadRouter.post(
    '/image',
    uploader(['image/jpeg', 'image/webp'], 1048576, 'Image allow only').single('image'),
    singleImageUploadController
);

uploadRouter.use(errorHandler);

export default uploadRouter;
