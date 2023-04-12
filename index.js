const logEvents = require('./logEvents.js');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// add listener for the log events
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
  //  Emit event
  myEmitter.emit('log', 'log event emitted!');
}, 2000);
