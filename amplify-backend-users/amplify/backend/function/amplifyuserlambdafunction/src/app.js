// /*
// Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
//     http://aws.amazon.com/apache2.0/
// or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and limitations under the License.
// */




// const express = require('express')
// const bodyParser = require('body-parser')
// const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
// const AWSAppSyncClient = require('aws-appsync').default;
// const gql = require('graphql-tag');
// const aws = require('aws-sdk');
// // require('dotenv').config();
// // aws.config.update({
// //   region: process.env.REGION,
// // });



// // declare a new express app
// const app = express()
// app.use(bodyParser.json())
// app.use(awsServerlessExpressMiddleware.eventContext())

// // Client for AWSAppSync
// const client = new AWSAppSyncClient({
//   url: process.env.API_URL,
//   region: process.env.REGION,
//   auth: {
//     type: 'AWS_IAM',
//     credentials: aws.config.credentials,
//   },
//   disableOffline: true,
// });



// // GraphQL mutations and queries
// const ADD_USER = gql`
//   mutation AddUser($input: CreateUserInput!) {
//     createUser(input: $input) {
//       id
//       name
//       email
//       tenantId
//     }
//   }
// `;

// const UPDATE_USER = gql`
//   mutation UpdateUser($input: UpdateUserInput!) {
//     updateUser(input: $input) {
//       id
//       name
//       email
//       tenantId
//     }
//   }
// `;

// const GET_ALL_USERS = gql`
//   query GetUsersByTenantId($tenantId: ID!) {
//     listUsers(filter: { tenantId: { eq: $tenantId } }) {
//       items {
//         id
//         name
//         email
//         tenantId
//       }
//     }
//   }
// `;

// const GET_USER_BY_ID = gql`
//   query GetUserById($id: ID!) {
//     getUser(id: $id) {
//       id
//       name
//       email
//       tenantId
//     }
//   }
// `;


// // Enable CORS for all methods
// app.use(function(req, res, next) {
//   console.log(`Received request: ${req.method} ${req.url}`);
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "*")
//   next()
// });

// // Endpoints
// app.post('/add-user', async (req, res) => {
//   const { name, email, tenantId } = req.body;
//   try {
//     const response = await client.mutate({
//       mutation: ADD_USER,
//       variables: { input: { name, email, tenantId } },
//     });
//     res.json(response.data.createUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/update-user', async (req, res) => {
//   const { id, name, email, tenantId } = req.body;
//   try {
//     const response = await client.mutate({
//       mutation: UPDATE_USER,
//       variables: { input: { id, name, email, tenantId } },
//     });
//     res.json(response.data.updateUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/get-all-user', async (req, res) => {
//   console.log('Handling /get-all request');
//   const { tenantId } = req.query;
//   console.log('Tenant ID:', tenantId);
//   try {
//     const response = await client.query({
//       query: GET_ALL_USERS,
//       variables: { tenantId },
//     });
//     res.json(response.data.listUsers.items);
//   } catch (error) {
//     console.error('Error fetching all users:', error);
//     res.status(500).json({ error: error.message });
//   }
// });


// app.get('/get-by-id', async (req, res) => {
//   console.log('Handling /get-by-id request');
//   const { id } = req.query;
//   try {
//     const response = await client.query({
//       query: GET_USER_BY_ID,
//       variables: { id },
//     });
//     res.json(response.data.getUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Add a route to handle the root endpoint
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });
// // app.listen(3000, function() {
// //     console.log("App started")
// // });

// // Export the app object. When executing the application local this does nothing. However,
// // to port it to AWS Lambda we will create a wrapper around that will load the app from
// // this file
// module.exports = app




const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
const aws = require('aws-sdk');

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Client for AWSAppSync
const client = new AWSAppSyncClient({
  url: process.env.API_URL,
  region: process.env.REGION,
  auth: {
    type: 'AWS_IAM',
    credentials: aws.config.credentials,
  },
  disableOffline: true,
});

// GraphQL mutations
const ADD_USER = gql`
  mutation AddUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      tenantId
    }
  }
`;

// Enable CORS for all methods
app.use(function(req, res, next) {
  console.log(`Received request: ${req.method} ${req.url}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Endpoints
app.post('/add-user', async (req, res) => {
  const { name, email, tenantId } = req.body;
  try {
    const response = await client.mutate({
      mutation: ADD_USER,
      variables: { input: { name, email, tenantId } },
    });
    res.json(response.data.createUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a route to handle the root endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;








