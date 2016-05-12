//Set up logger

var logger = require('./logging.js');
logger.log("");
logger.info("Starting ModuleManager");
logger.log("");


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

function checkIfModule(folder){
	//Check if folder contains a module.json
	if(!fileExists(folder + "/module/module.json")){
		return false;
	}
}

moduleDirectories.filter(checkIfModule);





var express = require('express');
var app = express();
logger.info("Express server created");






app.get('/', function (req, res) {
	res.send('Hello World!');
});



app.listen(3000, function () {
	logger.info('App listening on port 3000');
});