const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    },
    migrations: {
      directory: path.join(__dirname, '/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/database/seeds'),
    },
  },
  // production will need some adjustment for deployement (process.env.DATABASE_URL)
  production: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    },
    migrations: {
      directory: path.join(__dirname, '/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/database/seeds/production'),
    },
  },
};
