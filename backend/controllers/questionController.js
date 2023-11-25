import Question from "../models/question.js";
export const createQuestion = async (req, res) => {
  try {
    const { question, subject, topic, difficulty, marks } = req.body;
    console.log("Creating a question");

    const newQuestion = new Question({
      question,
      subject,
      topic,
      difficulty,
      marks,
    });

    const questionCreated = await newQuestion.save();

    console.log("Question created successfully: ", questionCreated);
    res.status(200).json(questionCreated);
  } catch (error) {
    console.log("Error in creating a question: ", error);
    res.status(500).json({ msg: "Error in creating a question" });
  }
};

export const createManyQuestions = async (req, res) => {
  const questions = req.body;
  console.log("Creating multiple questions");

  try {
    const questionsCreated = await Question.insertMany(questions);

    console.log("Questions created successfully");
    res.status(200).json(questionsCreated);
  } catch (error) {
    console.log("Error in creating questions: ", error);
    res.status(500).json({ msg: "Error in creating questions" });
  }
};

export const getQuestionById = async (req, res) => {
  console.log("Retrieving a question by id");
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      console.log("Question not found");
      return res.status(404).json({ msg: "Question not found" });
    }

    console.log("Question retrieved successfully: ", question);
    res.status(200).json(question);
  } catch (error) {
    console.log("Error in retrieving a question: ", error);
    res.status(500).json({ msg: "Error in retrieving a question" });
  }
};

export const getAllQuestions = async (req, res) => {
  console.log("Retrieving all questions");
  try {
    const questions = await Question.find();

    if (!questions) {
      console.log("Questions not found");
      return res.status(404).json({ msg: "Questions not found" });
    }

    console.log("Questions retrieved successfully: ", questions);
    res.status(200).json(questions);
  } catch (error) {
    console.log("Error in retrieving questions: ", error);
    res.status(500).json({ msg: "Error in retrieving questions" });
  }
};

export const updateQuestionById = async (req, res) => {
  console.log("Updating a question by id");
  try {
    const { question, subject, topic, difficulty, marks } = req.body;

    const questionToUpdate = await Question.findById(req.params.id);

    if (!questionToUpdate) {
      console.log("Question not found");
      return res.status(404).json({ msg: "Question not found" });
    }

    if (question) {
      questionToUpdate.question = question;
    }

    if (subject) {
      questionToUpdate.subject = subject;
    }

    if (topic) {
      questionToUpdate.topic = topic;
    }

    if (difficulty) {
      questionToUpdate.difficulty = difficulty;
    }

    if (marks) {
      questionToUpdate.marks = marks;
    }

    const questionUpdated = await questionToUpdate.save();

    console.log("Question updated successfully: ", questionUpdated);
    res.status(200).json(questionUpdated);
  } catch (error) {
    console.log("Error in updating a question: ", error);
    res.status(500).json({ msg: "Error in updating a question" });
  }
};

export const deleteQuestionById = async (req, res) => {
  console.log("Deleting a question by id");
  try {
    const questionToDelete = await Question.findById(req.params.id);

    if (!questionToDelete) {
      console.log("Question not found");
      return res.status(404).json({ msg: "Question not found" });
    }

    const questionDeleted = await Question.deleteOne({ _id: req.params.id });

    console.log("Question deleted successfully: ", questionDeleted);
    res.status(200).json(questionDeleted);
  } catch (error) {
    console.log("Error in deleting a question: ", error);
    res.status(500).json({ msg: "Error in deleting a question" });
  }
};

export const searchQuestionsByDifficulty = async (req, res) => {
  console.log("Searching questions by difficulty");
  try {
    const { difficulty } = req.body;

    const questions = await Question.find({ difficulty });

    if (!questions) {
      console.log("Questions not found");
      return res.status(404).json({ msg: "Questions not found" });
    }

    console.log("Questions retrieved successfully: ", questions);
    res.status(200).json(questions);
  } catch (error) {
    console.log("Error in retrieving questions: ", error);
    res.status(500).json({ msg: "Error in retrieving questions" });
  }
};

export const searchQuestionsBySubject = async (req, res) => {
  console.log("Searching questions by subject");
  try {
    const { subject } = req.body;

    const questions = await Question.find({ subject });

    if (!questions) {
      console.log("Questions not found");
      return res.status(404).json({ msg: "Questions not found" });
    }

    console.log("Questions retrieved successfully: ");
    res.status(200).json(questions);
  } catch (error) {
    console.log("Error in retrieving questions: ", error);
    res.status(500).json({ msg: "Error in retrieving questions" });
  }
};

export const generateQuestionPaper = async (req, res) => {
  try {
    console.log("Generating question paper");
    const { marks, difficultyDistribution } = req.body;

    // Validate inputs
    if (!isValidDifficultyDistribution(difficultyDistribution)) {
      console.log("Invalid difficulty distribution");
      return res.status(400).json({ msg: "Invalid difficulty distribution" });
    }

    const questions = await generateQuestions(marks, difficultyDistribution);

    console.log("Question paper generated successfully: ", questions);
    res.status(200).json({ questions });
  } catch (error) {
    console.log("Error in generating question paper: ", error);
    res.status(500).json({ msg: "Error in generating question paper" });
  }
};

// -----------------------------------------Helper functions --------------------------------------

function isValidDifficultyDistribution(distribution) {
  let totalPercentage = 0;
  console.log("Validating difficulty distribution");

  for (let i = 0; i < distribution.length; i++) {
    console.log(distribution[i]);
    totalPercentage += distribution[i];
  }

  return totalPercentage == 100;
}

export const generateQuestions = async (totalMarks, difficultyDistribution) => {
  const questions = [];
  console.log("Generating questions");

  for (let i = 0; i < difficultyDistribution.length; i++) {
    const difficultyMarks = (difficultyDistribution[i] / 100) * totalMarks;
    let questionsByDifficulty = [];
    if (i == 0) {
      questionsByDifficulty = await Question.find({
        difficulty: "easy",
      });
    } else if (i == 1) {
      questionsByDifficulty = await Question.find({
        difficulty: "medium",
      });
    } else if (i == 2) {
      questionsByDifficulty = await Question.find({
        difficulty: "hard",
      });
    }
    const shuffledQuestions = shuffleArray(questionsByDifficulty);

    questions.push(
      ...selectQuestionsByMarks(shuffledQuestions, difficultyMarks)
    );
  }

  console.log("Questions generated successfully");
  return questions;
};

function selectQuestionsByMarks(questions, marks) {
  const selectedQuestions = [];
  let remainingMarks = marks;

  console.log("Selecting questions by marks");

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    if (question.marks <= remainingMarks) {
      selectedQuestions.push(question);
      remainingMarks -= question.marks;
    }
  }

  return selectedQuestions;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  console.log("Array shuffled successfully");
  return array;
}
