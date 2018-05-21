import usersController from '../controllers/users';

const tokenMiddleware = (req, res, next) => {
  usersController.checkToken(req, res, next);
};

export default tokenMiddleware;
