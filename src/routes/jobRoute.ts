import express from "express";
import {
  createJob,
  deleteJob,
  getActiveJob,
  getAllJob,
  getClosedJob,
  getJob,
  getTotalCandidate,
  updateJob,
} from "../controllers/jobController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create-job", authenticateUser, createJob);
router.get("/get-jobs", authenticateUser, getAllJob);
router.get("/getone-ticket/:id", authenticateUser, getJob);
router.put("/update-ticket/:id", authenticateUser, updateJob);
router.delete("/delete-job/:id", authenticateUser, deleteJob);
router.get("/jobs-active", authenticateUser, getActiveJob);
router.get("/closed-jobs", authenticateUser, getClosedJob);
router.get("/total-candidate", authenticateUser, getTotalCandidate);

export default router;
