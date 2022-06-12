const express = require("express");
const app = express();

var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   console.log("Middleware console ", JSON.stringify(req.body));
//   next();
// });

const expressRouter = require("./Router/index");

app.use(expressRouter);

// handles promise rejection
process.on("unhandledRejection", (error) => {
  throw error;
});

// handles uncaught exception
process.on("uncaughtException", (error) => {
  console.log("uncaughtException");
  console.log("error " + error.message);
  //process.exit(0);
  //res.send({status:500,message:"Internal service error"});
  // if (!isOperationalError(error)) {
  // process.exit(1)
  // }
});

app.listen(8080, async () => {
  //import database function
  global.db = await require("./db/mongodb").db();
  console.log("server started at 8080");
});
