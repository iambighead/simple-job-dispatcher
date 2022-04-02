# simple-job-dispatcher

## Description

Curent Version 0.0.1

simple-job-dispatcher is a simple in-process job dispatcher. This is probably
useful only if the job you going to do is async, as all jobs are still executied
in single event-loop. If you job is synchronus, it might be easier just to use a
simple loop.

## Requirements

- [node.js](http://nodejs.org/) -- v10.16.0 or newer, older version probably
  works but only tested on 10.16

## Installation

    npm install simple-job-dispatcher

# Example

There is an exmaple.js provided, which also shown below.

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

Running it shall give you result like below

    % node example.js 
    received job: {"id":1,"data":"something"}
    received job: {"id":2,"data":"something"}
    { queue_count: 2, loading: 2 }
    { queue_count: 2, loading: 2 }
    { queue_count: 2, loading: 2 }
    { queue_count: 2, loading: 2 }
    job done
    received job: {"id":3,"data":"something"}
    job done
    received job: {"id":4,"data":"something"}
    { queue_count: 0, loading: 2 }
    { queue_count: 0, loading: 2 }
    { queue_count: 0, loading: 2 }
    { queue_count: 0, loading: 2 }
    { queue_count: 0, loading: 2 }
    job done
    job done
    { queue_count: 0, loading: 0 }
