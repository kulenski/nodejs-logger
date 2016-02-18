#!/usr/bin/env node
/*
 * Logger server
 * -------------------------------------------
 * Waits for requests
 * /logs - returns the dates of all log files
 *  /log/YYYY-mm-dd - returns the log for the selected date
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var cp = require('child_process');

var logDirectory ='/home/smartscan/logs/';

var DEBUG = true;

/*
 * Create the logger listen server
 * ---------------------------------
 */

 function onRequest(request,response) {
     var uriPath = url.parse(request.url).pathname;
    //if (DEBUG) console.log(uriPath);

    // /log/2016-02-12
    var re = new RegExp('^\/log\/\\d{4}-\\d{1,2}-\\d{1,2}$');

    // Dispatcher
    if (uriPath == '/logs') {
        var result = [];
        fs.readdir(logDirectory, function(err, files){
        if (err) {
            //return null;
        }
            files.filter(function(file){
                return fs.statSync(logDirectory+file).isFile() && path.extname(file) == '.log';
            }).forEach(function(file){
                result[result.length] = path.basename(file,'.log');
            });
            if(DEBUG) console.log(JSON.stringify(result));

            response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});
            response.write(JSON.stringify(result));
            response.end();
        });

    // /log/2016-02-12
    } else if (uriPath.match(re) != null) {
		var filename = uriPath.substring(5,uriPath.length);
        var logfile = logDirectory + filename + '.log';
        try{
            fs.readFile(logfile, function(err, data){
                if (err) {
                    response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin':'*'});
                    response.write('error');
                    response.end();
                }
                else {
                    response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin':'*'});
                    var htmlData = (data+'').replace(/\n/g,'<br/>');
                    response.write(htmlData);
                    response.end();
                }
            });
        } catch(e) {
            console.log(e.message);
            response.end();
        }

    } else {
        response.end();
    }
 }

 http.createServer(onRequest).listen(30391);
 console.log('Server started!');
