module.exports = {

    // utility function to get a screenshot 
    getScreenshot: function(url, selectors) {

        // declare local vars
        const Chromeless = require('chromeless').default;
        const domSelectors = Array.isArray(selectors) ? selectors : [selectors];

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


        return new Promise(resolve => {
            // navigate
            console.log('Utils.getScreenshot > navigating...');
            chrome.goto(url)
            .then(() => {
                console.log('Utils.getScreenshot > selecting...');
                return Promise.all(domSelectors.map(domSelector => {
                    chrome.wait(domSelector, 5000);
                }));
            })
            .then(() => {
                console.log('Utils.getScreenshot > waiting...');
                return chrome.wait(5000);
            })
            .then(() => {
                console.log('Utils.getScreenshot > screenshotting...');
                return chrome.screenshot();
            })
            .then(() => {
                console.log('Utils.getScreenshot > closing...');
                return chrome.end();
            })
            .then(() => {
                console.log('Utils.getScreenshot > returning...');
                resolve(true);
            })
            .catch(err => {
                console.log('An error occurred', err);
                return chrome.end()
                .then(() => {
                    resolve(err);
                });
            });
        });
    }
};
