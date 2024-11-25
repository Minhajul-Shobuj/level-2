//local module
const { add: add1, a } = require("./local.js"); //name alias, if have same name of function or object or anythig from different file use name alias to separate those--
const add = require("./local-1.js");
// console.log(add(2, 3, 1), add1(5, 7));

//built-in module
const path = require("path");
const fileName = path.dirname("G:/Shobuj/Learning-Node/index.js");
console.log(fileName);
