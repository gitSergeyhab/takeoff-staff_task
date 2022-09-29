import { Router } from 'express';
import { userController } from '../controllers/user-controller';


const usersRouter = Router();

usersRouter.post('/registration', userController.register);
usersRouter.post('/login', userController.login);

export {usersRouter};