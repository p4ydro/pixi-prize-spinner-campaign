// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC036291fad1b74c33ed3a4784655532fa';
const authToken = '196b81328e237eea77dc596449d90825';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Your Via reward code is: ',
     from: '+12064294476',
     to: '+12068833226'
   })
  .then(message => console.log(message.sid))
  .done();