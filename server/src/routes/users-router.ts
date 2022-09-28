import { Router } from 'express';
import { controller } from '../controller';

const usersRouter = Router();

usersRouter.post('/registration', controller.register);
usersRouter.post('/login', controller.login);



export {usersRouter};