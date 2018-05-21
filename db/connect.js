import Mongoose from 'mongoose';
import logger from '../utils/app-logger';
import config from '../utils/config.dev';

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
  const dbName = config.dbName;
  try {
    await Mongoose.connect(`mongodb://mongo/${dbName}`, { useMongoClient: true });
    logger.info('Connected to mongo!!!');
  } catch (err) {
    logger.error('Could not connect to MongoDB: ', err);
  }
};

export default connectToDb;
