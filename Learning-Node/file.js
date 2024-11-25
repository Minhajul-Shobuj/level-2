const fs = require("fs");

//reading a text
const readingTxt = fs.readFileSync("./text/read.txt", "utf-8");

//writing a text
const writingTxt = fs.writeFileSync(
  "./text/write.txt",
  readingTxt + "creating a writing file using nodejs"
);
console.log(writingTxt);
