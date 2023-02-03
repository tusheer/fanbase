import express from 'express';
import { getRefreshToken } from '../../controller/auth';

const authRouter = express();

authRouter.get('/refresh-token', getRefreshToken);

export default authRouter;
