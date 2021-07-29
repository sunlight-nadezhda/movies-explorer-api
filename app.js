const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routes = require('./routes');
const cors = require('./middlewares/cors');
const handlingErrors = require('./middlewares/handling-errors');

const app = express();
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.use(errors());
app.use(handlingErrors);

app.listen(3000);
