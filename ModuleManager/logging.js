var winston = require('winston');

var options = {
	json: false,
	timestamp: function(){return new Date().toLocaleString();},
	level:'silly',
	humanReadableUnhandledException: true,
	colorize: true
};

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(options),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false, timestamp: function(){return new Date().toLocaleString();},humanReadableUnhandledException: true })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)(options),
    new winston.transports.File({ filename: __dirname + '/exceptions.log',timestamp: function(){return new Date().toLocaleString();}, json: false,humanReadableUnhandledException: true })
  ],
  exitOnError: false
});

logger.cli();
logger.setLevels(winston.config.npm.levels);


module.exports = logger;