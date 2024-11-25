import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInDB = async (user: User) => {
  try {
    const result = await UserModel.create(user);
    return result;
  } catch (error) {
    console.error("Error creating user in DB:", error);
    throw error;
  }
};

export const userService = {
  createUserInDB,
};
