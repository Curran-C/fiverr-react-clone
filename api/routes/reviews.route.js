import express from "express";
import Review from "../models/review.modal.js";

import {
  createReview,
  getReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();
router.post("/", createReview);
router.get("/:gigId", getReview);
router.delete("/:id", deleteReview);

export default router;
