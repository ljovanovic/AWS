'use strict';

module.exports = {

    // utility function to get a screenshot 
    getContent: function(url, contentSelector = undefined, doScreenshot = false) {

        // debug
        console.log('utils.getContent > start', {url, contentSelector, doScreenshot});

        // declare local vars
        const Chromeless = require('chromeless').default;
        let jsonToReturn = '';

        // instantiate a chrome session
        const chrome = new Chromeless({
            waitTimeout: 20000,
            cdp: {  
                secure: true
            },
            remote: {
                endpointUrl: process.env.CHROMELESS_URI,
                apiKey: process.env.CHROMELESS_API_KEY
            }
        });

        // initate the retrieval
        return new Promise(resolve => {
            // navigate
            console.log('Utils.getContent > navigating...');
            chrome.goto(url)
            .then(() => {
                // pause for content to load
                return chrome.wait(5000);
            })
            .then(() => {
                // retrieve any configured content
                if (contentSelector) {
                    console.log('Utils.getContent > selecting content...');
                    return chrome.evaluate((cssSelector) => {
                        // this will be executed in headless chrome
                        const items = [].map.call(
                            document.querySelectorAll(cssSelector), 
                            (elem) => { return { content: elem.innerText }; }
                        );
                        return JSON.stringify(items);
                    }, contentSelector);
                } else {
                    return [];
                }
            })
            .then(availableTimes => {
                // debug
                console.log('Utils.getScreenshot > located available times', availableTimes);
                // persist for later use
                jsonToReturn = availableTimes;
                // take screenshot if requested
                console.log('Utils.getScreenshot > screenshotting, if necessary...');
                return doScreenshot ? chrome.screenshot() : true;
            })
            .then(() => {
                console.log('Utils.getScreenshot > closing...');
                return chrome.end();
            })
            .then(() => {
                console.log('Utils.getScreenshot > returning...');
                resolve(jsonToReturn);
            })
            .catch(err => {
                console.log('An error occurred', err);
                return chrome.end()
                .then(() => {
                    resolve(err);
                });
            });
        });
    },
};
