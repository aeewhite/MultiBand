var winston = require('winston');

var options = {
	json: false,
	timestamp: niceDate,
	level:'silly',
	humanReadableUnhandledException: true,
	colorize: true
};

function niceDate(){
	return new Date().toLocaleString();
}

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(options),
		new winston.transports.File({
			filename: __dirname + '/debug.log',
			json: false,
			timestamp: niceDate,
			humanReadableUnhandledException: true 
		})
	],
	exceptionHandlers: [
		new (winston.transports.Console)(options),
		new winston.transports.File({
			filename: __dirname + '/exceptions.log',
			timestamp: niceDate,
			json: false,
			humanReadableUnhandledException: true 
		})
	],
	exitOnError: false
});

logger.cli();
logger.setLevels(winston.config.npm.levels);


module.exports = logger;