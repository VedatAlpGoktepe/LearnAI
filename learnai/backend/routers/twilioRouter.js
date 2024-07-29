import { Router } from 'express';
import OpenAI from 'openai';
import mongoose from 'mongoose';
import Lesson from '../models/Lesson.js';
import User from '../models/User.js';
import * as dotenv from "dotenv";
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

export const twilioRouter = Router();

twilioRouter.post('/generate-lesson', async function (req, res, next) {
  const body = req.body;
  const prompt = body.content;
  let number = body.number;
  // remove +1 from number if exists
  if (number.startsWith('+1')) {
    number = number.slice(2);
  } else {
    res.status(400).send({ error: 'US/CA number required', number });
    return;
  }

  let users = [];
  try {
    users = await User.find({ number: number });
    if (users.length === 0) {
      res.status(404).send({ error: 'No user with given number found', number });
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
                "options": [
                  {
                    "answer": "Option 1",
                    "correct": false
                  },
                  {
                    "answer": "Option 2",
                    "correct": true
                  },
                  {
                    "answer": "Option 3",
                    "correct": false
                  },
                  {
                    "answer": "Option 4",
                    "correct": false
                  },
                ],
              },
              {
                "question": "Question 2",
                "options": [
                  {
                    "answer": "Option 1",
                    "correct": false
                  },
                  {
                    "answer": "Option 2",
                    "correct": false
                  },
                  {
                    "answer": "Option 3",
                    "correct": false
                  },
                  {
                    "answer": "Option 4",
                    "correct": true
                  },
                ],
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
      
      // for each user in users loop
      let lesson;
      let failures = [];
      for (const user of users) {
        const email = user.email;

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
          lesson = await Lesson.create(lessonData);
        } catch (error) {
          console.error('Error saving lesson for ' + user.name, error.message);
          failures.push({ user: user.email, error: error.message });
          continue;
        }
      }
      if (failures.length === 0) {
        res.status(200).json({ message: 'All lessons generated successfully', num_users: users.length });
        return;
      } else if (failures.length === users.length) {
        res.status(500).send({ error: 'Error saving lessons for all users', failures });
        return;
      } else {
        res.status(200).json({ message: 'Some lessons generated successfully', num_users: users.length, failures });
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
