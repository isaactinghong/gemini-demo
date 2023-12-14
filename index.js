const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'gpt-chat-js', location: 'asia-southeast1' });
const model = 'gemini-pro';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generation_config: {
    "max_output_tokens": 2048,
    "temperature": 0.9,
    "top_p": 1
  },
});

async function generateContent() {
  const chat = generativeModel.startChat({

  });

  /* sample code from gemini-pro

  async function streamChat() {
    const chat = generativeModel.startChat({});
    const chatInput1 = "How can I learn more about Node.js?";
    const result1 = await chat.sendMessageStream(chatInput1);
    for await (const item of result1.stream) {
        console.log(item.candidates[0].content.parts[0].text);
    }
    console.log('aggregated response: ', JSON.stringify(await result1.response));
  }

  streamChat();
  */

  // while loop to keep the conversation going
  while (true) {
    // Get the user input
    const userInput = await getInput();
    // Send the user input to the model
    const streamResult = await chat.sendMessageStream([{text: userInput}]);

    // Print the response
    for await (const item of streamResult.stream) {
      const candidate = item.candidates[0];

      if (candidate) {
        console.log(`Bot: ${candidate.content.parts[0].text}`);
      }

    }
  }

};

async function getInput() {
  // Get the user input
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    readline.question('You: ', (input) => {
      readline.close();
      resolve(input);
    });
  });
}


generateContent();