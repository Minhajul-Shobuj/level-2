const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.on("birthday", () => {
  console.log("happy birthday");
});

myEmitter.on("birthday", (gift) => {
  console.log(`"I will send a ${gift}"`);
});

myEmitter.emit("birthday", "bike");
