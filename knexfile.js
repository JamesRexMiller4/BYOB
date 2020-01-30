
module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './platform/db/migrations',
    },
    useNullAsDefault: true,
  },
};
