import express from "express";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();
// router.post("/:gigId", createOrder);
router.get("/", getOrders);
router.put("/", confirm);
router.post("/create-payment-intent/:id", intent);

export default router;
