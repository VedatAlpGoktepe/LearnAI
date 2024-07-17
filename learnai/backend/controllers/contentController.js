import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
});

export const generateLesson = async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    console.log('OpenAI API response:', completion); // Log the full response

    if (completion.choices && completion.choices.length > 0) {
      res.json(completion.choices[0].message.content);
    } else {
      res.status(500).send({ error: 'Invalid response structure from OpenAI API', details: completion });
    }
  } catch (error) {
    console.error('Error generating content:', error.message);
    res.status(500).send({ error: 'Error generating content', details: error.message });
  }
};
