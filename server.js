import express from 'express';
import bodyParser from 'body-parser';
import bearerToken from 'express-bearer-token';
import cors from 'cors';
import morgan from 'morgan';
import { exec } from 'child_process';

import signinRouter from './routes/signin';
import signupRouter from './routes/signup';
import infoRouter from './routes/info';
import logoutRouter from './routes/logout';
import tokenMiddleware from './middlewares/token';
import connectToDb from './db/connect';
import logger from './utils/app-logger';
import config from './utils/config.dev';
import { SIGNUP_URL, SIGNIN_URL, INFO_URL, LOGOUT_URL, LATENCY_URL } from './utils/const';

const port = config.serverPort;
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: logger.stream }));
app.use(bearerToken());

app.use(SIGNUP_URL, signupRouter);
app.use(SIGNIN_URL, signinRouter);
app.use(tokenMiddleware);
app.use(INFO_URL, infoRouter);
app.use(LOGOUT_URL, logoutRouter);

app.get(LATENCY_URL, (req, res) => {
  exec('ping -c 3 www.google.com', (error, stdout, stderr) => {
    res.send(stdout || stderr || error);
  });
});

app.get('/', (req, res) => {
  res.send(`Available endpoints are: ${SIGNUP_URL}, ${SIGNIN_URL}, ${INFO_URL}, ${LOGOUT_URL}, ${LATENCY_URL}`);
});

app.listen(port, () => {
  logger.info('server started - ', port);
});
