import express from "express";

//function
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.post("/newgig", createGig);
router.delete("/delete/:id", deleteGig);
router.get("/single/:id", getGig);
router.get("/gigs", getGigs);
export default router;
