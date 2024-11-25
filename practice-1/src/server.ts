import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
const port = config.port;
const url = config.url;

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(url as string);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port} `);
    });
  } catch (err) {
    console.log(err);
  }
}
