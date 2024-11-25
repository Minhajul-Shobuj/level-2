import { model, Schema } from "mongoose";
import { Student, UserName } from "./student/student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "name is required"],

    maxlength: [20, "first Name can`t more than 20 charactars"],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
    },
    message: "{VALUE} is not capitalize format",
  },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: Number, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Feamle", "Others"],
      message: "{VALUE} is not valid",
    },
    required: true,
  },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
});

export const StudentModel = model<Student>("Student", studentSchema);
