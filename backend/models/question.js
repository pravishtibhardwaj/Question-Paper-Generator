import mongoose from "mongoose";
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  question: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    trim: true,
  },
  topic: {
    type: String,
    trim: true,
  },
  difficulty: {
    type: String,
    trim: true,
  },
  marks: {
    type: Number,
    trim: true,
  },
  difficultyDistribution: {
    type: Array,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("question", QuestionSchema);
