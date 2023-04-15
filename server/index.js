const express = require('express');
const path = require('path');
const cors = require('cors')
const { Configuration, OpenAIApi } = require("openai");
const CircularJSON = require('circular-json');
require('dotenv').config()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const app = express()
const port = 3001


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));


app.post('/api/generate', async (req, res) => {
  const code = Buffer.from(req.body.code).toString('base64');
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Base64 decode the input and find any bugs: ${code}`,
    max_tokens: 200,
    temperature: 0,
  });
  // console.log(response.data)

  res.status(200).send(CircularJSON.stringify(response.data));
})

app.listen(port, () => {
  console.log('listening at', port);
});