import express from "express";
import { StudetnController } from "./student.controller";

const router = express.Router();
router.post("/create-student", StudetnController.createStudent);

export const StudentRoute = router;
