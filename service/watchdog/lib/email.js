'use strict';

class Email {
    constructor(toAddress, subject, plainTextBody, htmlBody) {
        this.toAddress = toAddress;
        this.subject = subject;
        this.plainTextBody = plainTextBody;
        this.htmlBody = htmlBody;
    }
}

// method to backfill and validate a user
Email.prototype.send = function() {

    // declare local vars
    const aws = require('aws-sdk');
    const ses = new aws.SES();

    // initate delivery
    return new Promise((resolve, reject) => {
        // debug
        console.log('email.send > start');
        
        // get handles on key values
        const replyToName = process.env.EMAIL_REPLY_DISPLAY_NAME;
        const replyToAddress = process.env.EMAIL_REPLY_ADDRESS;
        
        // construct the message specifics
        const messageParams = {
          Destination: {
            ToAddresses: [this.toAddress]
          },
          Message: {
            Subject: {
              Data: this.subject,
              Charset: 'UTF-8'
            },
            Body: {}
          },
          Source: replyToAddress,
          ReplyToAddresses: [
            replyToName + '<' + replyToAddress + '>'
          ]
        };
  
        if (this.plainTextBody) {
          messageParams.Message.Body.Text = {
            Data: this.plainTextBody,
            Charset: 'UTF-8'
          };
        }
  
        if (this.htmlBody) {
          messageParams.Message.Body.Html = {
            Data: this.htmlBody,
            Charset: 'UTF-8'
          };
        }
        
        // send the mail
        ses.sendEmail(messageParams, (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          }
  
          resolve(data);
        });
    });
};

// export
module.exports = Email;