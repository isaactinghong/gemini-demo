Use this script to request a model response in your application.
Install the Vertex AI SDK.
npm install https://github.com/googleapis/nodejs-vertexai
gcloud auth application-default login

Create an index.js file and add the following code:
```ts
const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'gpt-chat-js', location: 'us-central1'});
const model = 'gemini-pro';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generation_config: {
```

Run the code.
node index.js