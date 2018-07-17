require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const messageCtrl = require("./messageCtrl.js");
const session = require("express-session");

const app = express();

// top level middleware -- runs with each request
app.use(bodyParser.json());
app.use(
  session({
    secret: "superdu",
    resave: false,
    saveUninitialized: false
  })
);
app.use((req, res, next) => {
  let badWords = ["knucklehead", "jerk", "internet explorer"];
  if (req.body.message) {
    let badWordsExist = true;
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], "g");
      req.body.message = req.body.message.replace(regex, "****");
    }
    next();
  } else {
    next();
  }
});

// endpoints
app.get("/api/messages", messageCtrl.getAllMessages);
app.post("/api/messages", messageCtrl.createMessages);
app.get("/api/messages/history", messageCtrl.history);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`you are in port${process.env.SERVER_PORT}`);
});
