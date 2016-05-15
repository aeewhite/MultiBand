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
	var moduleName = folder.split(path.sep).slice(-1)[0]; //take the last element
	//Check if folder contains module/module.json
	if(!fileExists(folder + "/module/module.json")){
		logger.warn("'" + moduleName + "' does not contain a module.json file, ignoring");
		return false;
	}

	//Do some validation on the module file
	var moduleFile = JSON.parse(fs.readFileSync(folder + "/module/module.json", 'utf8'));
	var errors = moduleValidator.validate(moduleFile, moduleSchema).errors;
	if(errors.length !== 0){
		logger.warn("'" + moduleFile.name + "' contains an error in module.json, ignoring");
		logger.debug("["+ moduleFile.name +"] " + errors[0].message);
		return false;
	}

	//Check that executable exists
	if(!fileExists(folder + "/module/" + moduleFile.executable)){
		logger.warn("'" + moduleFile.name + "' missing executable file, ignoring");
		return false;
	}

	return true;
}

moduleDirectories = moduleDirectories.filter(checkIfModule);

/*
Convert module path to module objects
 */
var Module = require("./module.js").Module;
var modules = [];
for(var i = 0; i<moduleDirectories.length; i++){
	modules.push(new Module(moduleDirectories[i]));
}




/*
Start up the web server
 */
var express = require('express');
var app = express();
logger.info("Express server created");


var currentModule = null;

app.get('/', function (req, res) {
	res.send('Hello World! Welcome to Module Manager');
});

app.get('/modules',function(req, res){
	logger.debug("Sent module list to client");
	res.send(modules);
});

app.get('/setModule/:moduleNumber', function(req,res){
	if(req.params.moduleNumber > modules.length - 1 || req.params.moduleNumber < 0){
		logger.error("Attempt to set module failed, index out of bounds (" + req.params.moduleNumber + " was sent)");
		res.status(400).send("Error: Module not found");
	}
	else{
		currentModule = modules[req.params.moduleNumber];
		logger.info("Set current module to '" + modules[req.params.moduleNumber].moduleName + "'");
		res.send(modules[req.params.moduleNumber]);
	}
});

app.get('/sendMessage/:command', function(req, res){
	if(!currentModule){
		logger.error("Attempt to send command '" + req.params.command + "' failed, no module set");
		res.status(400).send("Error: Module not set");
	}
	else if(!currentModule.actions[req.params.command]){
		logger.error("Attempt to send command '" + req.params.command + "' failed, module does not support");
		res.status(400).send("Error: Module does not support '" + req.params.command + "'");
	}
	else{
		currentModule.sendMessage(req.params.command);
		res.send("Command sent successfully to " + currentModule.moduleName);
	}
});

app.get('/sendMessageWithResponse/:command', function(req, res){
	if(!currentModule){
		logger.error("Attempt to send command '" + req.params.command + "' failed, no module set");
		res.status(400).send("Error: Module not set");
	}
	else if(!currentModule.actions[req.params.command]){
		logger.error("Attempt to send command '" + req.params.command + "' failed, module does not support");
		res.status(400).send("Error: Module does not support '" + req.params.command + "'");
	}
	else{
		currentModule.sendMessageWithResponse(req.params.command, function(output){
			res.set('Content-Type','text/plain').send(output);
		});
	}
});

app.listen(3000, function () {
	logger.info('App listening on port 3000');
});