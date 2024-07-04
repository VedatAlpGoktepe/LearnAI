const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const openai = new OpenAIApi(configuration);

exports.generateContent = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "text-davinci-002",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
