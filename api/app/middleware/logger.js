import { format, transports} from 'winston';
import expressWinston from 'express-winston';

const appRoot = require('app-root-path');
const { combine, timestamp, prettyPrint} = format;

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
    errors: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

// const logger = createLogger({
const logger = expressWinston.logger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new transports.Console(options.console),
        new transports.File(options.file),
        new transports.File(options.errors)
    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

/*const handler = (func) => (req, res) => {
    try {
       logger.info('server.handler.begun');
       func(req, res, logger);
    } catch (e) {
        logger.info('server.handler.failed');
        res.send('oh no, something went wrong');
    }
};
*/

exports.logger = logger;
//exports.handler = handler;
