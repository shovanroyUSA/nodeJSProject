# nodeJSProject
Midterm project

1. Set Up the Project
   - Create a new Node.js project.
   - Install Express.js.
   - Initialize a `.env` file to store API keys.

2. Create Environment Variables
   - Store Tracking API keys in the `.env` file.

3. Create API Routes
   - Define an Express route to handle POST requests for tracking details.
   - Parse the JSON body of the incoming request to get the `orderNumber`.
   - Validate that `orderNumber` is provided, returning a 400 response if not.

4. Consume Tracking APIs
   - Use Axios library to make API requests to tracking endpoints.
   - Include the respective API keys in the request headers.
   - Pass the `orderNumber` to the UPS or FedEx API to fetch tracking details.

5. Handle API Responses
   - Handle the responses from Upstream API
   - Parse the data and extract relevant tracking information.
   - Combine the tracking information from both APIs if needed.

6. Error Handling
   - Implement error handling for API requests.
   - Return appropriate error responses if there are issues with API requests.

7. Documentation
   - Provide clear documentation on how to use the API, including the required request format and endpoint.
   - Document the expected response format and status codes.
   - Include instructions on setting up environment variables.
