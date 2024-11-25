import express, { Request, Response } from "express";
import cors from "cors";
import { UserRoute } from "./app/modules/user/user.route";

const app = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1/users", UserRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! from practice-1");
});

export default app;
