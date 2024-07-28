import { Router } from 'express';
import OpenAI from 'openai';
import mongoose from 'mongoose';
import Lesson from '../models/Lesson.js';
import User from '../models/User.js';

const openai = new OpenAI({
  apiKey: "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",
});

const uri = "mongodb+srv://vedatalpgktp:110110Aa@learnai-data.cw4z9hy.mongodb.net/?retryWrites=true&w=majority&appName=LearnAI-Data";

mongoose.connect(uri);

export const contentRouter = Router();

contentRouter.post('/generate-lesson', async function (req, res, next) {
  const prompt = req.body.content;
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ error: 'User not found', email });
      return;
    }
  } catch (error) {
    console.error('An Error Occurred:', error.message);
    res.status(500).send({ error: 'Error finding user', details: error.message });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role: "system", content: `Given the users prompt, find what topic the user wants to learn about. If you can't find a topic respond with {"error": "Couldn't find topic", "status": 500}.
          You will generate as many readings required to teach the topic, with a minimum of 1 reading, with a minimum of 100 words per reading. The readings in the response should be in order of increasing difficulty or make sense to read in order.
          You will generate as many flashcards required to teach the topic, with a minimum of 3 flashcards. The flashcards in the response should be unordered/randomized.
          You will generate as many questions required to teach the topic, with a minimum of 5 questions. Make sure that there is only 1 correct answer. The questions in the response should be in order of increasing difficulty.
          Return the data as a string with the following format.
          {
            "title": "Title of Lesson",
            "readings" : [
              {
                "title": "Title of Reading 1",
                "content": "Content of Reading 1"
              },
              {
                "title": "Title of Reading 2",
                "content": "Content of Reading 2"
              },
              ...,
            ],
            "flashcards" : [
              {
                "question": "Question 1",
                "answer": "Answer 1"
              },
              {
                "question": "Question 2",
                "answer": "Answer 2"
              },
              ...,
            ],
            "quiz" : [
              {
                "question": "Question 1",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "answer": "1" // Index of the correct answer in the options array (0-3)
              },
              {
                "question": "Question 2",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "answer": "3"
              },
              ...,
            ]
          }
          `
        },
        { role: "user", content: prompt }
      ],
    });

    console.log('OpenAI API response:', completion); // Log the full response

    if (completion.choices && completion.choices.length > 0) {
      let generated = completion.choices[0].message.content;
      let generatedParsed = JSON.parse(generated);
      
      let lessonData = {
        title: generatedParsed.title,
        email: email,
        chats: [{
          user: prompt,
          response: {
            readings: generatedParsed.readings,
            flashcards: generatedParsed.flashcards,
            quiz: generatedParsed.quiz
          }
        }]
      }

      try {
        const lesson = await Lesson.create(lessonData);
        res.status(200).json({ message: 'Lesson generated successfully', lesson });
        return;
      } catch (error) {
        console.error('Error saving lesson:', error.message);
        res.status(500).send({ error: 'Error saving lesson', details: error.message });
        return;
      }
    } else {
      res.status(500).send({ error: 'Invalid response structure from OpenAI API', details: completion });
      return;
    }
  } catch (error) {
    console.error('Error generating content:', error.message);
    res.status(500).send({ error: 'Error generating content', details: error.message });
    return;
  }
});

contentRouter.post('/improve-lesson/:id', async function (req, res, next) {
  const lessonData = req.body.lesson;
  const userInput = req.body.textPrompt;
  const email = req.body.email;

  try {
    const user = await User.exists({ email: email });
    if (!user) {
      res.status(404).send({ error: 'User not found', email });
      return;
    }
  } catch (error) {
    console.error('An Error Occurred:', error.message);
    res.status(500).send({ error: 'Error finding user', details: error.message });
    return;
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role: "system", content: `Given a JSON of previously generated lessons and user inputs, edit the latest lesson based on the input.
          If necessary, you will update existing readings to teach the topic and/or generate new readings if required, with any reading output has a minimum of 100 words. The readings in the response should be in order of increasing difficulty or make sense to read in order.
          If necessary, you will update existing flashcards to teach the topic and/or generate new flashcards if required. The flashcards in the response should be unordered/randomized.
          If necessary, you will update existing questions to teach the topic and/or generate new questions if required. Make sure that there is only 1 correct answer. The questions in the response should be in order of increasing difficulty.
          Return the new lesson data as a string with the following format.
          {
            "readings" : [
              {
                "title": "Title of Reading 1",
                "content": "Content of Reading 1"
              },
              {
                "title": "Title of Reading 2",
                "content": "Content of Reading 2"
              },
              ...,
            ],
            "flashcards" : [
              {
                "question": "Question 1",
                "answer": "Answer 1"
              },
              {
                "question": "Question 2",
                "answer": "Answer 2"
              },
              ...,
            ],
            "quiz" : [
              {
                "question": "Question 1",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "answer": "1" // Index of the correct answer in the options array (0-3)
              },
              {
                "question": "Question 2",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "answer": "3"
              },
              ...,
            ]
          }
          `
        },
        { role: "user", content: JSON.stringify(lessonData.chats) + userInput }
      ],
    });

    console.log('OpenAI API response:', completion); // Log the full response

    if (completion.choices && completion.choices.length > 0) {
      let generated = completion.choices[0].message.content;
      let generatedParsed = JSON.parse(generated);
      let id = req.params.id;
      
      console.log('user input:', userInput);

      lessonData.chats.push({
        user: userInput,
        response: {
          readings: generatedParsed.readings,
          flashcards: generatedParsed.flashcards,
          quiz: generatedParsed.quiz
        }
      });

      try {
        const lesson = await Lesson.findByIdAndUpdate(id, lessonData, { new: true });
        if (lesson) {
          res.status(200).json({ message: 'Lesson improved successfully', lesson });
          return;
        }
        else {
          res.status(404).send({ error: 'Lesson not found', id });
          return;
        }
      } catch (error) {
        console.error('Error saving lesson:', error.message);
        res.status(500).send({ error: 'Error saving lesson', details: error.message });
        return;
      }
    } else {
      res.status(500).send({ error: 'Invalid response structure from OpenAI API', details: completion });
      return;
    }
  } catch (error) {
    console.error('Error generating content:', error.message);
    res.status(500).send({ error: 'Error generating content', details: error.message });
  }
});

contentRouter.get('/lessons/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    const lesson = await Lesson.findById(id);
    if (lesson) {
      res.status(200).json(lesson);
    } else {
      res.status(404).send({ error: 'Lesson not found', id });
    }
  } catch (error) {
    console.error('Error fetching lesson:', error.message);
    res.status(500).send({ error: 'Error fetching lesson', details: error.message });
  }
});

contentRouter.get('/lessons', async function (req, res, next) {
  const email = req.headers.email;
  try {
    const lessons = await Lesson.find({email: email}, {title: 1}).sort({ updatedAt: -1 });
    if (lessons) {
      res.status(200).json(lessons);
    } else {
      res.status(404).send({ error: 'Lesson not found', id });
    }
  } catch (error) {
    console.error('Error fetching lesson:', error.message);
    res.status(500).send({ error: 'Error fetching lesson', details: error.message });
  }
});
