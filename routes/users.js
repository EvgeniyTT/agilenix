import express from 'express';
import usersController from '../controllers/users';

const userRouter = express.Router();

userRouter.param('userId', (req, res, next, userId) => {
  req.userId = userId;
  next();
});

userRouter.get('/', (req, res) => {
  usersController.getAllUsers(req, res);
});

userRouter.get('/:userId', (req, res) => {
  usersController.getUser(req, res);
});

userRouter.post('/', (req, res) => {
  usersController.addUser(req, res);
});

export default userRouter;
