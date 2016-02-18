#!/usr/bin/env node
/*
 * Logger.js
 * ---------------------------------------------------------------
 * This script logs all the entries in a log file and additionally
 * outputs the message to console.
 * ---------------------------------------------------------------
 *
 * @messageType can be E (Error), D (Debug), I (Information)
 * @messageTag is typically the function name e.g. getLogFilename
 * @messageBody is the real message to log
 *
 */

var fs = require('fs');

var messageType = process.argv[2];
var messageTag = process.argv[3];
var messageBody = process.argv[4];

var DEBUG = false;

var logDirectory = '/home/smartscan/logs';
var logFile = logDirectory + '/' + getLogFilename();

/*
 * Main execution
 * ----------------------------------------------------------------------------------
 */

// Always show the message in console
var logMessage = timestamp() + ' - ' + '[' + messageType +'] ' + messageTag + ': ' + messageBody;
console.log(logMessage);

// Check if log directory exists and create it if not.

/* node.0.10.36 only have fs.exists
 * in newer version fs.existsSync should be replaced with
 * fs.accessSync(path, fs.F_OK) and be surrouned in try/catch
 */
//try {
    if(fs.existsSync(logDirectory)) {
        if (DEBUG) console.log('Directory exists.');
    } else {
        if(DEBUG) console.log('Directory doesnt exist. Creating it!');
        fs.mkdirSync(logDirectory);
    }
//} catch(e) {
//  if(DEBUG) console.log('Directory doesnt exist. Creating it!. error: %s',e.message);
//  fs.mkdirSync(logDirectory);
//}

// Check if log file exists and create it if not.
//try {
    if(fs.existsSync(logFile)) {
        if (DEBUG) console.log('Log file %s exists.',logFile);
    } else {
        if(DEBUG) console.log('Log file %s doesnt exists! Creating it!',logFile);
        var fd = fs.openSync(logFile,'w');
        fs.closeSync(fd);
    }
//} catch(e) {
//  if(DEBUG) console.log('Log file %s doesnt exists! Creating it!',logFile);
//  var fd = fs.openSync(logFile,'w');
//  fs.closeSync(fd);
//}

// Write to file
fs.appendFile(logFile,logMessage+'\n', function(err){
    //
});


/*
 * ------------------------------------------------------------------------------------
 */



/*
 * Functions
 */
function timestamp() {
    return now = new Date().toISOString().replace(/T/, ' ').replace(/Z/, '');
}

function getLogFilename() {
    return new Date().toISOString().substring(0,10) + '.log';
}



/*
 * logger -- add this function your script
 * @type E, D, I.
 * @tag Typically the name of the function.
 */
function logger(type,tag,msg) {
    var exec = require('child_process').exec;
    exec('/home/smartscan/scripts/logger.js ' + type + ' \'' + tag + '\' \'' + msg +'\'', function(error,stdout,stderr){
        //if(error != null) {console.log(error);}
    }).stdout.on('data',function(data){
        console.log(data);
    });
}
