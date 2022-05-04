console.log('process.env.DATABASEE_URL:>> ', process.env.DATABASE_URL);
console.log('process.env.IS_DEVELOPMENT:>> ', process.env.IS_DEVELOPMENT);

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*{.entity,.index}{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  ssl: process.env.IS_DEVELOPMENT === "TRUE" ? false : true,  
  cli: {
    migrationsDir: ['src/database/migrations/'],
    entitiesDir: 'src/models',
  },
};
