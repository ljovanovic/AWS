class Watchdog {
    constructor(url, selectors, port) {
        this.url = url;
        this.selectors = Array.isArray(selectors) ? selectors : [selectors];
        this.port = port;
    }
}

// method to backfill and validate a user
Watchdog.prototype.watch = function() {
    return new Promise((resolve, reject) => {
        // imports
        const Utils = require('./utils');

        // get a screenshot
        console.log('Watchdog.watch > getting screenshot...');
        Utils.getScreenshot(this.url, this.selectors)
        .then(stuff => {
            console.log('Watchdog.watch > returning...', stuff);
            resolve(stuff);
        });
    });
};
  
// export
module.exports = Watchdog;