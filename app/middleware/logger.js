import winston from 'winston';
const appRoot = require('app-root-path');

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file)
    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

const handler = (func) => (req, res) => {
    try {
       logger.info('server.handler.begun');
       func(req, res, logger);
    } catch (e) {
        logger.info('server.handler.failed');
        res.send('oh no, something went wrong');
    }
};

module.exports = logger;