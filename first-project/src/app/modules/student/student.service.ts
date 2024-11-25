import { StudentModel } from "../student.model";
import { Student } from "./student.interface";
// import StudentModel from "../student.model"

const createStudentInDB = async (student: Student) => {
  const result = await StudentModel.create();
  return result;
};

export const StuentService = {
  createStudentInDB,
};
