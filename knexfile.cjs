require('dotenv').config();

module.exports = {
  client: 'mysql2',

  debug: process.env.ENV !== 'prod',
  asyncStackTraces: process.env.ENV !== 'prod',
  compileSqlOnError: process.env.ENV !== 'prod',
  
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'Z',
    decimalNumbers: true,
  },

  acquireConnectionTimeout: 10000,
  defaultDateTimePrecision: 3,

  pool: { 
    min: 0,
    max: 10,
    afterCreate: (conn, done) => {
      conn.query('SET time_zone = "+00:00";', (err) => done(err, conn));
    }
  },
  
  migrations: {
    directory: './migrations'
  },

  seeds: {
    directory: './seeds'
  },
};