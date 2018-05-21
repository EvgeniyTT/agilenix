import path from 'path';

const config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbName = process.env.dbName || 'agilenix';
config.serverPort = process.env.serverPort || 3000;

export default config;
