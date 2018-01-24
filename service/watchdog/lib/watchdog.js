'use strict';

class Watchdog {
    constructor(url, selector, port) {
        this.url = url;
        this.selector = selector;
        this.port = port;
    }
}

// method to backfill and validate a user
Watchdog.prototype.look = function() {
    return new Promise((resolve, reject) => {
        // imports
        const Utils = require('./utils');

        // get a screenshot
        console.log('Watchdog.watch > initiating request...');
        Utils.getContent(this.url, this.selector)
        .then(stuff => {
            console.log('Watchdog.watch > returning...', stuff);
            resolve(stuff);
        });
    });
};
  
// export
module.exports = Watchdog;