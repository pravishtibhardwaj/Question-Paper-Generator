// Npm Packages
import express from "express";
const router = express.Router();

// Controllers
import {
  createQuestion,
  createManyQuestions,
  getQuestionById,
  getAllQuestions,
  updateQuestionById,
  deleteQuestionById,
  searchQuestionsByDifficulty,
  searchQuestionsBySubject,
  generateQuestionPaper,
} from "../controllers/questionController.js";

// Routes for /api/questions

router.post("/create", createQuestion);

router.post("/createMany", createManyQuestions);

router.get("/get/:id", getQuestionById);

router.get("/getAll", getAllQuestions);

router.put("/update/:id", updateQuestionById);

router.delete("/delete/:id", deleteQuestionById);

router.post("/searchByDifficulty", searchQuestionsByDifficulty);

router.post("/searchBySubject", searchQuestionsBySubject);

router.post("/generateQuestionPaper", generateQuestionPaper);

export default router;
