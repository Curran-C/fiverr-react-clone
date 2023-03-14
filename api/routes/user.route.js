import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";
const router = express.Router();

router.delete("/:id", deleteUser);
router.get("/:id", getUser);

export default router;
