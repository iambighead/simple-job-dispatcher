'use strict';

const dispatcher_factory = require('simple-job-dispatcher');

const dispatcher = new dispatcher_factory();

// define a worker function that process job
// in this case it just display job detail and return after 5s
const worker = (job, done) => {
    console.log(`received job: ${JSON.stringify(job)}`);
    setTimeout(done, 5000);
};

// initialize dispatcher with max parallel processing of 2 jobs
dispatcher.init(
    2,
    worker
);

// use getStats to check dispatcher status
setInterval(() => {
    console.log(dispatcher.getStats());
}, 1000);

// exit the app after 11s
setTimeout(process.exit, 11000, 0);

// push some jobs
dispatcher.addJob({
    id: 1,
    data: "something"
}, () => console.log('job done'));

dispatcher.addJob({
    id: 2,
    data: "something"
}, () => console.log('job done'));

dispatcher.addJob({
    id: 3,
    data: "something"
}, () => console.log('job done'));

dispatcher.addJob({
    id: 4,
    data: "something"
}, () => console.log('job done'));