// 1. Set Up the Project
//    - Create a new Node.js project.
//    - Install Express.js.
//    - Initialize a `.env` file to store API keys.

// 2. Create Environment Variables
//    - Store Tracking API keys in the `.env` file.

// 3. Create API Routes
//    - Define an Express route to handle POST requests for tracking details.
//    - Parse the JSON body of the incoming request to get the `orderNumber`.
//    - Validate that `orderNumber` is provided, returning a 400 response if not.

// 4. Consume Tracking APIs
//    - Use Axios library to make API requests to tracking endpoints.
//    - Include the respective API keys in the request headers.
//    - Pass the `orderNumber` to the UPS or FedEx API to fetch tracking details.

// 5. Handle API Responses
//    - Handle the responses from Upstream API
//    - Parse the data and extract relevant tracking information.
//    - Combine the tracking information from both APIs if needed.

// 6. Error Handling
//    - Implement error handling for API requests.
//    - Return appropriate error responses if there are issues with API requests.

// 7. Documentation
//    - Provide clear documentation on how to use the API, including the required request format and endpoint.
//    - Document the expected response format and status codes.
//    - Include instructions on setting up environment variables.
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv').config(); //npm install dotenv --save
const express = require('express'); //npm install express --save
// Create a new file named .env in  current directory and set API_KEY_NAME=api-key-value
const trackingApiKey = process.env.API_KEY_NAME; 
const axios = require('axios'); //npm install axios --save



const app = express();
//parse the JSON body of incoming requests, using the express.json() middleware
app.use(express.json()); 
//define a route to handle POST requests for tracking details
app.post('/track', (req, res) => {
  const { orderNumber } = req.body;

  // Validate the orderNumber
  if (!orderNumber) {
    return res.status(400).send({ error: 'Order number is required' });
  }

  // Further processing here...

  res.send('Order details received.');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
// FedEx API Key=l74e6f14637f704453b2f8a0b46def44d0
//FedEx Secrete Key=53d04b3708284533afadc9630e57a9d4

async function fetchTrackingDetails(orderNumber, carrier) {
  const apiEndpoint = carrier === 'FedEx' ? 'https://ups.example.com/track'  // Replace with the actual UPS API endpoint
    : 'https://apis-sandbox.fedex.com/oauth/token';  // Replace with the actual FedEx API endpoint
  
  const apiKey = process.env.API_KEY_NAME;  // Assuming API key is stored in .env file
  
  try {
    const response = await axios.post(apiEndpoint, 
      { orderNumber }, 
      { headers: { 'Authorization': `Bearer ${apiKey}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching tracking details:', error);
    throw error;
  }
}

app.post('/track', async (req, res) => {
  const { orderNumber, carrier } = req.body;

  // Validate the orderNumber and carrier
  if (!orderNumber || !carrier) {
    return res.status(400).send({ error: 'Order number and carrier are required' });
  }

  try {
    const trackingDetails = await fetchTrackingDetails(orderNumber, carrier);
    res.send(trackingDetails);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch tracking details' });
  }
});


const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTPS World!\n');
  
});

const PORT = 443; // Default HTTPS port
server.listen(PORT, () => {
  console.log(`${trackingApiKey} Server is running on https://localhost:${PORT}`);

});





app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use('/request', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});

app.get('/v1', (req, res) => {
  res.send('Successful response.');
});

app.get('/api1/users', function(req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  res.send({
    'user_id': user_id,
    'token': token,
    'geo': geo
  });
});

// ...

app.param('name', function(req, res, next, name) {
  const modified = name.toUpperCase();

  req.name = modified;
  next();
});

// routes will go here
// ...

app.get('/api/users/:name', function(req, res) {
  res.send('Hello ' + req.name + '!');
});

app.use(express.urlencoded({ extended: true }));
app.post('/api/users', function(req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;

  res.send({
    'user_id': user_id,
    'token': token,
    'geo': geo
  });
});

