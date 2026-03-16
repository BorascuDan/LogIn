import knex from 'knex';
import knexConfig from './../../knexfile.cjs';

let dbInstance = null;

const getDbInstance = () => {
  if (!dbInstance) dbInstance = knex(knexConfig);

  dbInstance.on('query', q => {
    q.start = Date.now();
  });

  dbInstance.on('query-response', (res, q) => {
    const duration = Date.now() - q.start;

    if (duration > 200) {
      console.warn('Slow query', {
        duration,
        sql: q.sql
      });
    }
  });

  dbInstance.on('query-error', (err, q) => {
    console.error('Query error', {
      sql: q.sql,
      bindings: q.bindings,
      error: err.message
    });
  });

  return dbInstance;
};

const db = getDbInstance();

export default db;