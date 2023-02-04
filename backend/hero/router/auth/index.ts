import express from 'express';
import { getRefreshToken } from '../../controller/auth';
import errorHandler from '../../middleware/errorHandler';

const authRouter = express();

authRouter.get('/refresh-token', getRefreshToken);

authRouter.use(errorHandler);

export default authRouter;
