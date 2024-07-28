import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const uri = "mongodb+srv://vedatalpgktp:110110Aa@learnai-data.cw4z9hy.mongodb.net/?retryWrites=true&w=majority&appName=LearnAI-Data";

mongoose.connect(uri);

export const accountRouter = Router();

accountRouter.post('/login', async function (req, res, next) {
  const token = req.body.token;
  const email = token.email;
  const name = token.given_name;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      user = await User.create({ email: email, username: name });
      res.status(200).send({message: 'User created', user});
    }
    else {
      if (user.username !== name) {
        user.username = name;
        await user.save();
      }
      res.status(200).send({message: 'Logged In', user});
    }
  } catch (error) {
    console.error('An Error Occurred:', error.message);
    res.status(500).send({ error: 'Error finding user', details: error.message });
  }
});
