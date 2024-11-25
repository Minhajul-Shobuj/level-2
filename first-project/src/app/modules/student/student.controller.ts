import { Request, Response } from "express";
import { StuentService } from "./student.service";

const createStudent = (req: Request, res: Response) => {
  try {
    const student = req.body;
    const result = StuentService.createStudentInDB(student);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: "something went wrong",
    });
  }
};

export const StudetnController = { createStudent };
