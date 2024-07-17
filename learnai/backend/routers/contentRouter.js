import { Router } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
});

export const contentRouter = Router();

contentRouter.post('/generate-lesson', async function (req, res, next) {
  const prompt = req.body.content;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: `Given a topic/subject, you will generate a maximum of 5 Readings, Flashcards, and a Quiz in that order. with the following format.
          <div class='readings-container subcontainer'>
            <h2 id='readingTitle'>Readings</h2>
            <h3 class='readingTitles'>[Reading 1 Name]</h3>
            <p class='readingContent'>[Reading 1 Content]</p>
            ...
            <h3 class='reading-titles'>[Reading X Name]</h3>
            <p class='reading-content'>[Reading X Content]</p>
          </div>
          <div class='flashcards-container subcontainer'>
            <h2 class='flashcard-title'>Flashcards</h2>
            <h3 class='flashcard-questions'>[Flashcard 1 Question]</h3>
            <p class='flashcard-answers'>[Flashcard 1 Answer]</p>
            ...
            <h3 class='flashcard-questions'>[Flashcard Y Question]</h3>
            <p class='flashcard-answers'>[Flashcard Y Answer]</p>
          </div>
          <div class='quiz-container subcontainer'>
            <h2 class='quiz-title'>Quiz</h2>
            <h3 class='quiz-questions'>Question 1: [question 1]</h3>
            <p class='quiz-options'>[option 1]</p>
            <p class='quiz-options quiz-answers'>[option 2]</p>
            <p class='quiz-options'>[option 3]</p>
            <p class='quiz-options'>[option 4]</p>
            ...
            <h3 class='quiz-questions'>Question Z: [question Z]</h3>
            <p class='quiz-options'>[option 1]</p>
            <p class='quiz-options quiz-answers'>[option 2]</p>
            <p class='quiz-options'>[option 3]</p>
            <p class='quiz-options'>[option 4]</p>
          </div>
          `
        },
        { role: "user", content: prompt }
      ],
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
});
