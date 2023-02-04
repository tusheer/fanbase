import express from 'express';
import uploader from '../../utils/upload';
import { singleImageUploadController } from '../../controller/upload';

const uploadRouter = express();

uploadRouter.post(
    '/image',
    uploader(['image/jpeg', 'image/webp'], 1048576, 'JPG allow only').single('image'),
    singleImageUploadController
);

export default uploadRouter;
