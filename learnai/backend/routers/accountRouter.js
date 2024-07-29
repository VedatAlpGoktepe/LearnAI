import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import * as dotenv from "dotenv";
dotenv.config()

const uri = process.env.MONGODB_URI;

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

accountRouter.get('/user/', async function (req, res, next) {
  const email = req.headers.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    }
    else {
      res.status(200).send({ message: 'User found', user });
    }
  } catch (error) {
    console.error('An Error Occurred:', error.message);
    res.status(500).send({ error: 'Error finding user', details: error.message });
  }
});

accountRouter.put('/user/number', async function (req, res, next) {
  const email = req.body.email;
  const number = req.body.number;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    }
    else {
      user.number = number;
      await user.save();
      console.log(user);
      res.status(200).send({ message: 'Number updated', user });
    }
  } catch (error) {
    console.error('An Error Occurred:', error.message);
    res.status(500).send({ error: 'Error updating number', details: error.message });
  }
});
