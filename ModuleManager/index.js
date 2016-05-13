/*
Set up logger
 */

var logger = require('./logging.js');
logger.info("Starting ModuleManager");


/*
Find Modules in ./modules 
 */

var fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
  var directories = fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
  return directories.map(function(folder){return srcpath + "/" + folder;});
}

var moduleDirectories = getDirectories(__dirname + "/modules");

logger.info("Scanning " +moduleDirectories.length  + " possible modules");
// Check each directory for a module.json
function fileExists(filename){
	try{
		fs.statSync(filename);
	}
	catch(err){
		return false;
	}
	return true;
}

// Prepare to validate module files
var Validator = require("jsonschema").Validator;
var moduleValidator = new Validator();
var moduleSchema = {
	"id": "/Module",
	"type":"object",
	"properties": {
		"name": {"type":"string"},
		"version": {"type":"string"},
		"executable": {"type":"string"},
		"actions": {
			"type": "object",
			"required": ["start", "stop"]
		}
	},
	"required": ["name", "version", "executable","actions"]
};



function checkIfModule(folder){
	var moduleName = folder.split(path.sep).slice(-1)[0];
	//Check if folder contains module/module.json
	if(!fileExists(folder + "/module/module.json")){
		logger.warn(moduleName + " does not contain a module.json file, ignoring");
		return false;
	}

	//Do some validation on the module file
	var moduleFile = JSON.parse(fs.readFileSync(folder + "/module/module.json", 'utf8'));
	var errors = moduleValidator.validate(moduleFile, moduleSchema).errors;
	if(errors.length !== 0){
		logger.warn(moduleName + "contains an error in module.json, ignoring");
		logger.debug(errors);
		return false;
	}

	//Check that executable exists
	if(!fileExists(folder + "/module/" + moduleFile.executable)){
		logger.warn(moduleName + " missing executable file, ignoring");
		return false;
	}

	return true;
}

moduleDirectories = moduleDirectories.filter(checkIfModule);




/*
Start up the web server
 */
var express = require('express');
var app = express();
logger.info("Express server created");






app.get('/', function (req, res) {
	res.send('Hello World!');
});



app.listen(3000, function () {
	logger.info('App listening on port 3000');
});