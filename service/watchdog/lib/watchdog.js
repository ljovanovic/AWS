'use strict';

class Watchdog {
    // constructor to create a watchdog
    constructor(url, selector, port) {
        this.url = url;
        this.selector = selector;
        this.port = port;
    }

    // method to backfill and validate a user
    look() {
        // imports
        const Utils = require('./utils');

        // get a screenshot
        return new Promise((resolve, reject) => {
            console.log('Watchdog.watch > initiating request...');
            Utils.getContent(this.url, this.selector, true)
            .then(stuff => {
                console.log('Watchdog.watch > returning...', stuff);
                resolve(stuff);
            });
        });
    }
}
  
// export
module.exports = Watchdog;