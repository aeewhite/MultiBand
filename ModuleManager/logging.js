var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: function(){return new Date().toLocaleString();}, level:'silly'}),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: function(){return new Date().toLocaleString();}}),
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],
  exitOnError: false
});

logger.cli();
logger.setLevels(winston.config.npm.levels);


module.exports = logger;