var logger		= require('./logging.js'),
	execFile	= require('child_process').execFile,
	path 		= require('path'),
	fs 			= require('fs');

function Module(modulePath){
	var moduleFile = JSON.parse(fs.readFileSync(modulePath + "/module/module.json", 'utf8'));
	this.moduleName = moduleFile.name;
	this.path = modulePath;
	this.executable = modulePath + "/module/" + moduleFile.executable;
	this.version = moduleFile.version;
	this.actions = moduleFile.actions;
	//this.moduleFile = moduleFile; //Don't really need this
	logger.info("Loaded '" + this.moduleName + "'");

	//Call the executable with message as the first argument
	this.sendMessage = sendMessage;
}

/**
 * Call the executable with message as the first argument
 * @param  {String} message argument to call executable with
 */
function sendMessage(message){
	var module = this;

	logger.debug("[=>" + module.moduleName + "] Sending '" + message + "' to " + module.moduleName);
	var child = execFile(this.executable, [message], {
		cwd: this.path
	});

	child.stdout.on('data',function(data){
		data.trim().split(/\r?\n/).forEach(function(value, i){	//Split module outputs to make log look better
			logger.info("[" + module.moduleName + "] " + value.trim());
		});
	});
	child.stderr.on('data',function(data){
		data.trim().split(/\r?\n/).forEach(function(value, i){
			logger.error("[" + module.moduleName + "] " + value.trim());
		});
	});
}
	logger.debug("[=>" + module.moduleName + "] Sending '" + message + "' to " + module.moduleName);
	var child = execFile(this.executable, [message], {
		cwd: this.path
	});
	
	child.stdout.on('data',function(data){
		data.trim().split(/\r?\n/).forEach(function(value, i){	//Split module outputs to make log look better
			logger.info("[" + module.moduleName + "] " + value.trim());
		});
		
	});
	child.stderr.on('data',function(data){
		data.trim().split(/\r?\n/).forEach(function(value, i){
			logger.error("[" + module.moduleName + "] " + value.trim());
		});
	});
}

module.exports.Module = Module;