require('dotenv').config();

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/moviesdb',
  DB_SETTINGS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  DB_URL,
  DB_SETTINGS,
  NODE_ENV,
  JWT_SECRET,
};
