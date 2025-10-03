const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello from express!");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`listening on port ${port}`);
  }
});