'use strict';

// callback wrapper to handle some internal state
const makeCB = function (callback) {
    return (error, result) => {
        if (this.loading > 0) this.loading--;
        callback(error, result);
        dequeue.call(this);
    };
};

const dequeue = function () {
    if (this.loading < this.max_load) {
        const queue_obj = this.queue.shift();
        if (queue_obj) {
            this.loading++;
            const my_callback = makeCB.call(this, queue_obj.callback);
            this.dispatchFn(queue_obj.job, my_callback);
        }
    }
};

// --------------------------------------------------------------

const dispatcherFactory = function () {

    this.queue = [];
    this.max_load = 5;
    this.loading = 0;

    this.dispatchFn = () => {
        throw ("no dispatch function defined, call .setDispatchFn() first");
    };

    dispatcherFactory.prototype.init = function (max_load = 5, fn = null) {
        this.max_load = max_load;
        // console.log(`max_load = ${max_load}`);
        if (typeof fn == 'function') {
            this.dispatchFn = fn;
        } else throw "not a function";

    };

    dispatcherFactory.prototype.addJob = function (job, callback) {
        let queue_obj = {
            job: job,
            callback: callback
        };

        this.queue.push(queue_obj);
        dequeue.call(this);
    };

    dispatcherFactory.prototype.getStats = function () {
        return {
            queue_count: this.queue.length,
            loading: this.loading
        };
    };

    return this;
};

module.exports = dispatcherFactory;