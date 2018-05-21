import express from 'express';
import usersController from '../controllers/users';

const signinRouter = express.Router();

signinRouter.post('/', (req, res) => {
  usersController.signin(req, res);
});

export default signinRouter;
