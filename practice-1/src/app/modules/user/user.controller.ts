import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    console.log(user);
    const result = await userService.createUserInDB(user);
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

export const userController = {
  createUser,
};
