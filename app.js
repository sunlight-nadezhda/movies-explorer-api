const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const handlingErrors = require('./middlewares/handling-errors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(handlingErrors);

app.listen(3000);
