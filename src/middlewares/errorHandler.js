import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
    logger.error(`Error ${error.stack}`);
    const status = error.status || 500;
    res.status(status).json({msg: error.message});
}