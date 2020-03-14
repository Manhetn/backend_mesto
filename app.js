const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/users.js");
const cards = require("./routes/cards.js");
const errors = require("./routes/errors.js");
const userId = require("./middlewares/userId.js");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.json()); // parse application/json
app.use(userId); // временное решение
app.use(users);
app.use(cards);
app.use(errors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
