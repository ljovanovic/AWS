'use strict';

module.exports.handler = (event, context, callback) => {

    // declare local vars
    const Watchdog = require('./lib/watchdog');
    const Email = require('./lib/email');

    // create the instruction set
    const itemsToWatch = [
      { url: 'https://www.exploretock.com/tfl/search?date=2018-04-01&size=6&time=19%3A00', selector: 'span.Consumer-resultsListItemTime' },
      { url: 'https://www.exploretock.com/tfl/search?date=2018-05-01&size=6&time=19%3A00', selector: 'span.Consumer-resultsListItemTime' },
    ];
    
    // debug
    console.log('handler > watching...');

    // initiate watchdogs for each resource
    Promise.all(itemsToWatch.map((itemToWatch, index) => {
      return new Watchdog(itemToWatch.url, itemToWatch.selector).look();
    }))
    .then(results => {
      // debug
      console.log('handler > watched, results...', results);

      // for each item we would tee up content for an email
      const emailToSend = new Email(process.env.EMAIL_TO_ADDRESS, 'French Laudry Bitches!', 'This is a test email.');

      // send the email
      console.log('sending email...');
      return emailToSend.send();
    })
    .then(sendResult => {
      console.log('email sent.', sendResult);
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
