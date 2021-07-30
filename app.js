const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { PORT, DB_URL, DB_SETTINGS } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const cors = require('./middlewares/cors');
const handlingErrors = require('./middlewares/handling-errors');

const app = express();

mongoose.connect(DB_URL, JSON.parse(DB_SETTINGS));

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handlingErrors);

app.listen(PORT);
