import mongoose from "mongoose";

const { Schema, model } = mongoose;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  chats: [
    {
      user: {
        type: String,
        required: true,
      },
      response: {
        readings: [
          {
            title: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
          },
        ],
        flashcards: [
          {
            question: {
              type: String,
              required: true,
            },
            answer: {
              type: String,
              required: true,
            },
          },
        ],
        quiz: [
          {
            question: {
              type: String,
              required: true,
            },
            options: {
              type: [String],
              required: true,
            },
            answer: {
              type: Number,
              required: true,
            },
          },
        ],
      }
    }
  ],
});

lessonSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Lesson = model("Lesson", lessonSchema);
export default Lesson;
