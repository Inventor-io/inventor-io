const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/inventor_io',
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
    connection: 'postgres://localhost/inventor_io',
    migrations: {
      directory: path.join(__dirname, '/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/database/seeds/production'),
    },
  },
};
