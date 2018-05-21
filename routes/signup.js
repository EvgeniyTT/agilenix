import express from 'express';
import usersController from '../controllers/users';

const signupRouter = express.Router();

signupRouter.post('/', (req, res) => {
  usersController.addUser(req, res);
});

export default signupRouter;
