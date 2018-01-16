'use strict';

module.exports.handler = (event, context, callback) => {

    // declare local vars
    const Watchdog = require('./lib/watchdog');

    // create the instruction set
    const itemsToWatch = [
      { url: 'https://www.exploretock.com/tfl/search?date=2018-05-01&size=6&time=19%3A00', selectors: 'div.SearchModal-closed' },
      // { url: 'https://www.exploretock.com/tfl/search?date=2018-05-01&size=6&time=19%3A00', selectors: '' }
    ];
    
    console.log('handler > watching...');
    Promise.all(itemsToWatch.map((itemToWatch, index) => {
      return new Watchdog(itemToWatch.url, itemToWatch.selectors).watch();
    }))
    .then(results => {
      console.log('handler > watched, returning...', results);
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v1.0.1! Your function executed successfully!',
          input: event,
        }),
      };
    
      callback(null, response);
    });
};
