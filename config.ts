import dotenv from 'dotenv';
dotenv.config();

class Config{

            port = process.env.port;

            //database, postgres
            PG_host = process.env.pg_host || "localhost";
            PG_port = parseInt(process.env.pg_port as string, 10) || 5432;
            PG_user = process.env.pg_user || 'postgres';
            PG_pass = process.env.pg_pass || '123456';
            PG_db = process.env.pg_db || 'knex-pg-db';   
};

const config = new Config();
export default config;