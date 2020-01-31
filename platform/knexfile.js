// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/tweets',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/tweets_test',
    migrations: {
      directory: './platform/db/migrations',
    },
    seeds: {
      directory: './platform/db/seeds/test',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations',
    },
    useNullAsDefault: true,
  },
};
