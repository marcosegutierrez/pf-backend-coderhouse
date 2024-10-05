import winston from 'winston';

/* DEFAULT LEVELS:
SILLY
DEBUG
VERBOSE
HTTP
INFO
WARN
ERROR
*/

const customLevelOptions = {
    levels: {
        debug: 5,
        http: 4,
        info: 3,
        warning: 2,
        error: 1,
        fatal: 0
    }
}

const logConfigDev = {
    levels: customLevelOptions.levels,
    transports : [
        new winston.transports.Console({ level: 'debug'})
    ]
}

const logConfigProd = {
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({ level: 'info'}),
        // new winston.transports.File({
        //     filename: './logs/errors.log',
        //     level: 'error'
        // })
    ]
}

const loggerDev = winston.createLogger(logConfigDev);
const loggerProd = winston.createLogger(logConfigProd);

let environment = process.argv[2];
let loggerEnv = loggerDev;

if (environment === "prod") {
    loggerEnv = loggerProd;
}

export const logger = loggerEnv;