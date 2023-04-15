const express = require('express');
const path = require('path');
const cors = require('cors')
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
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
  // console.log('got here',code)
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Base64 decode the input and find any bugs: ${code}`,
    max_tokens: 200,
    temperature: 0,
  });
  console.log(response.data)

  // const data = response.data.choices[0].text
  res.status(200).send();
})

app.listen(port, () => {
  console.log('listening at', port);
});