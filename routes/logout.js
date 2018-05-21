import express from 'express';
import usersController from '../controllers/users';

const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
  usersController.logout(req, res);
});

export default logoutRouter;
