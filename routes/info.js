import express from 'express';
import usersController from '../controllers/users';

const infoRouter = express.Router();

infoRouter.get('/', (req, res) => {
  usersController.getUserByToken(req, res);
});


export default infoRouter;
