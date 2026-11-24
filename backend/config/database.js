const path = require('path');

const clean = (value) =>
  String(value || '')
    .trim()
    .replace(/^['"]+|['"]+$/g, '');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'postgres') {
    const host = clean(env('DB_HOST')).replace('-pooler', '');
    const database = clean(env('DB_NAME'));
    const user = clean(env('DB_USER'));
    const password = clean(env('DB_PASSWORD'));

    const missing = [];
    if (!host) missing.push('DB_HOST');
    if (!database) missing.push('DB_NAME');
    if (!user) missing.push('DB_USER');
    if (!password) missing.push('DB_PASSWORD');

    if (missing.length) {
      throw new Error('Missing in Render Environment: ' + missing.join(', '));
    }

    console.log('[db] connecting to host:', host, '| database:', database);

    return {
      connection: {
        client: 'postgres',
        connection: {
          host,
          port: 5432,
          database,
          user,
          password,
          ssl: { rejectUnauthorized: false },
        },
        pool: { min: 0, max: 10 },
        acquireConnectionTimeout: 60000,
      },
    };
  }

  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(
          __dirname,
          '..',
          env('DATABASE_FILENAME', '.tmp/data.db')
        ),
      },
      useNullAsDefault: true,
    },
  };
};