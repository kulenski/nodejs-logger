# nodejs-logger
Server side logging tool and server that sends the logs to browser on request

1. logger.js <TYPE> <TAG> <MSG>
    - TYPE can be basically one word like: Info, Warning, Debug, Error or anything else.
    - TAG is to be used for function name or some action.
    - MSG is the actual message.
  This script logs the data in a files in a directory (see var logDirectory) by placing the timestamp for your and by separating the files by date for you.

  There's a wrapper function logger() which can be used inside other script and you can use logger(type,tag,msg) to log to a file. logger() additionally will log to console, so you can see what is happening.
  
2. logger_server.js
  Logger server binds to the localhost and listens for 2 requests:
    - /logs - reads the names of all files and returns them as JSON array.
    - /log/YYYY-MM-DD - retursn the content of the log file for the selected date in HTML.

3. logread.html
  Client side page which uses the server and monitors the log files.
