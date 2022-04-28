/**
 * 7 path module
 * https://nodejs.org/dist/latest-v16.x/docs/api/path.html
 */
path = require('path');
path.parse(__dirname);
/**
 * 8 os module
 * https://nodejs.org/dist/latest-v16.x/docs/api/os.html
 */
os = require('os');
os.userInfo();
console.log(`total memory is ${os.totalmem()}`);
/**
 * 9 filesystem module
 * https://nodejs.org/dist/latest-v16.x/docs/api/fs.html
 */
const fs = require('fs');
const files = fs.readdirSync('./');
// 回调函数function
fs.readdir('./',function(err, files){
    if(err) console.log('Error', err);
    else console.log('Result', files);
})

/**
 * 10 Event Module
 * https://nodejs.org/dist/latest-v16.x/docs/api/events.html
 */

const EventEmitter = require('events');  //  EventEmitter is a class
const emmiter = new EventEmitter();
//Register a listener
emmiter.on('messageLogged', function(){
    console.log('Listener called');
});

// Raise an event
emmiter.emit('messageLogged');

/**
 * Modules System 11 Event Arguments
 */
//Register a listener
 emmiter.on('messageLogged2', function(arg){
    console.log('Listener2 called', arg);
});

// Raise an event
emmiter.emit('messageLogged2', {
    id: 1,
    url: 'http://'
});

// practice
emmiter.on('logging', (arg)=>{
    console.log('logging:', arg);
})
emmiter.emit('logging', {data:'message'});

/**
 * 12 Extending EventEmmiter
 */
// in logger.js
class Logger extends EventEmitter{
    log(message){
        console.log(message);
        this.emit('messageLogged',{id:2,url:'http://www'});
    }
}
const logger = new Logger();
logger.on('messageLogged', arg=>console.log('Listener called', arg));
logger.log('message in Logger class');

/**
 * 13 HTTP Module
 * https://nodejs.org/dist/latest-v16.x/docs/api/http.html
 */

const http = require('http');

// const server = http.createServer();
// server.on('connection', socket=>{
//     console.log('New connection...');
// });
const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write('hello, world');
        res.end();
    }
    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});
server.listen(3000);
console.log('Listening on port 3000 ...');

