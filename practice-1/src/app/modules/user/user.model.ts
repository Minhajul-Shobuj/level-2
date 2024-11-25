import { model, Schema } from "mongoose";
import { User, UserName } from "./user.interface";

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
});

const userSchema = new Schema<User>({
  id: Number,
  name: userNameSchema,
  gender: {
    type: String,
    enum: {
      values: ["Male", "Feamle", "Others"],
      // message: "{VALUE} is not valid",
    },
  },
  age: Number,
  religion: String,
  currentAddress: String,
  permanentAddress: String,
  contactNo: String,
  profileImg: String,
  eamil: String,
  isActive: {
    type: String,
    enum: {
      values: ["active", "inActive"],
    },
  },
});

export const UserModel = model<User>("User", userSchema);
