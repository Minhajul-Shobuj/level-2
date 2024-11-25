const fs = require("fs");

//reading file asynchronously
fs.readFile("./text/write.txt", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  //   console.log(data);

  //writing a file asynchronously
  fs.writeFile(
    "./text/writeFile-async.txt",
    data + "------write this asynchronously",
    (err) => {
      if (err) {
        throw err;
      }
      console.log("succed");
    }
  );
});
