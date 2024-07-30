// const awsServerlessExpress = require('aws-serverless-express');
// const app = require('./app');

// /**
//  * @type {import('http').Server}
//  */
// const server = awsServerlessExpress.createServer(app);

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = (event, context) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
// };


// const awsServerlessExpress = require('aws-serverless-express');
// const app = require('./app'); // Adjust the path if necessary
// const server = awsServerlessExpress.createServer(app);

// exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log('Event: ', JSON.stringify(event, null, 2));
  return awsServerlessExpress.proxy(server, event, context);
};

