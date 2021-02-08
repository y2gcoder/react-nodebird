const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "nodebird",
    "password": process.env.DB_PASSWORD,
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "nodebird",
    "password": process.env.DB_PASSWORD,
    "database": "react-nodebird-test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "nodebird",
    "password": process.env.DB_PASSWORD,
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
