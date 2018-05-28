import userModel from '../models/user';
import logger from '../utils/app-logger';
import { isValidEmail } from '../utils/validators';
import { USER_TYPE_EMAIL, USER_TYPE_PHONE } from '../utils/const';
import { getNewToken, TOKEN_LIVE_TIME } from '../utils/token';

const userController = {};

userController.addUser = async (req, res) => {
  const token = getNewToken();
  const user = userModel({
    userId: req.body.userId,
    password: req.body.password,
    type: isValidEmail(req.body.userId) ? USER_TYPE_EMAIL : USER_TYPE_PHONE,
    tokens: [{ token, expDate: new Date(new Date().getTime() + TOKEN_LIVE_TIME) }],
  });
  try {
    const savedUser = await userModel.create(user);
    if (savedUser) {
      res.set('Authorization', `Bearer ${token}`).send(savedUser);
    } else {
      res.status(500).send('Something goes wrong saving a user');
    }
  } catch (err) {
    logger.error(`Error creating a user: ${err}`);
    res.status(500).send(`Error creating a user: ${err}`);
  }
};

userController.signin = async (req, res) => {
  const newToken = getNewToken();
  try {
    const user = await userModel.getByUserPass(req.body.userId, req.body.password);
    if (user) {
      user.tokens.push({
        token: newToken,
        expDate: new Date(new Date().getTime() + TOKEN_LIVE_TIME),
      });
      await userModel.update(user._id, user);
      res.set('Authorization', `Bearer ${newToken}`).send(user);
    } else {
      res.status(400).send('No such a user, please verify userId and password');
    }
  } catch (err) {
    logger.error(`Error on getting a user: ${err}`);
    res.status(500).send(`Error on getting a user: ${err}`);
  }
};

userController.getUserByToken = async (req, res) => {
  const token = req.token;
  try {
    const user = await userModel.getByToken(token);
    res.set('Authorization', `Bearer ${token}`).send({ uerId: user.userId, type: user.type });
  } catch (err) {
    logger.error(`Error on getting a user: ${err}`);
    res.status(500).send(`Error on getting a user: ${err}`);
  }
};

userController.checkToken = async (req, res, next) => {
  const token = req.token;
  try {
    const user = await userModel.getByToken(token);
    const userToken = user && user.tokens.find(_token => _token.token === token);
    if (user && userToken && userToken.expDate > new Date()) {
      user.tokens = user.tokens.map(_token => _token.token === token
        ? { ..._token, expDate: new Date(new Date().getTime() + TOKEN_LIVE_TIME) }
        : _token
      );
      await userModel.update(user._id, user);
      res.set('Authorization', `Bearer ${token}`);
      next();
    } else {
      res.status(401).send('Token is wrong or expired, please signin');
    }
  } catch (err) {
    logger.error(`Error on checking token: ${err}`);
    res.status(500).send(`Error on checking token: ${err}`);
  }
};

userController.logout = async (req, res) => {
  const token = req.token;
  const isLogoutAll = req.query.all === 'true';
  try {
    const user = await userModel.getByToken(token);
    const userToken = user && user.tokens.find(_token => _token.token === token);
    if (user && userToken && userToken.expDate > new Date()) {
      user.tokens = isLogoutAll ? [] : user.tokens.filter(_token => _token.token !== token);
      await userModel.update(user._id, user);
      res.send('Successfully logged out');
    } else {
      res.status(401).send('Token is wrong or expired, please signin');
    }
  } catch (err) {
    logger.error(`Error on logout: ${err}`);
    res.status(500).send(`Error on logout: ${err}`);
  }
};

export default userController;
