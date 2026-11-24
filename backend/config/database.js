const path = require('path');

function cleanDatabaseUrl(raw) {
  if (!raw) return undefined;
  const match = String(raw).match(/postgres(?:ql)?:\/\/[^\s'"]+/);
  if (!match) return undefined;
  return match[0].replace(/[?&]channel_binding=[^&]*/g, '');
}

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'postgres') {
    const url = cleanDatabaseUrl(env('DATABASE_URL'));
    if (!url) {
      throw new Error(
        'DATABASE_URL is missing or does not contain a postgresql:// URL'
      );
    }
    try {
      console.log('[db] connecting to host:', new URL(url).host);
    } catch (e) {
      console.log('[db] could not read host from DATABASE_URL');
    }

    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: url,
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