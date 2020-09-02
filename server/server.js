const express = require("express");
const bodyParser = require("body-parser");
const cookieParse = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();

const user = require("./routes/user");
const books = require("./routes/book");


mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParse());
app.use("/api/users", user);
app.use("/api/books", books);


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
