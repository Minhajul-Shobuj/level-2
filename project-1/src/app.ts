import { error } from "console";
import express, { NextFunction, request, Request, Response } from "express";
const app = express();
const port = 3000;

//parsers
app.use(express.json());
app.use(express.text());

//middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method);
  next();
};

//route
const userRouter = express.Router();
const courseRouter = express.Router();
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/users", userRouter);

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    data: course,
  });
});

userRouter.get("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "user created successfully",
    data: user,
  });
});

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      res.send(" Proud to be a Muslim, Alhamdulillah!!");
    } catch (error) {
      next();
    }
  }
);

app.post("/", logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.send("got data");
});

//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({ success: false });
  }
});

export default app;
