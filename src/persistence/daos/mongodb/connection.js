import mongoose from 'mongoose';
import config from '../../../config.js';
import { logger } from '../../../utils/logger.js';

const MONGO_URL = config.MONGO_URL || 'mongodb://localhost:27017/superM';

const connectionString =  MONGO_URL;

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        logger.info('DB Connected');
    } catch (error) {
        throw new Error(error);
    }
}