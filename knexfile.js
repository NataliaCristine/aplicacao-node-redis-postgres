const knexfile = {
  client: "postgresql",
  connection: {
    database: 'desafio', 
    user: 'desafio',
    password: 'desafio',
    port: 5431,
    host: process.env.DATABASE_HOST,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

export default knexfile;

