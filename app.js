const express = require("express");
const app = express();
const port = 5000;
const userRoutes = require("./routes/userRoutes");


// user routes middleware
app.use("/api/users", userRoutes);

// register routes middleware
app.use("/api/users", userRoutes);

// login routes middleware
app.use("/api/users", userRoutes);


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