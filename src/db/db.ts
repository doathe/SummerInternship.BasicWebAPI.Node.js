import knex, {Knex} from "knex";
import config from "../../config";
import { DBError } from "../common/http-exception";

class DB{

    config: Knex.Config = {
        client: 'postgres',
        connection: {
            host: config.PG_host,
            user: config.PG_user,
            password: config.PG_pass,
            database: config.PG_db,
            port: config.PG_port,
        },
        pool:{min:0, max:7}
    }

    migration_config: Knex.MigratorConfig = {
        directory: "./src/db/migrations",
        tableName: "knex_user_migrations"
    }

    knx: Knex = knex(this.config);

    start(): Promise<boolean>{
        return new Promise<boolean>(async (resolve,reject) =>{

            this.knx.migrate.latest(this.migration_config).then(async (res) =>{
                console.log(res);
                console.log("Migration completed.");

                await this.knx.raw('SELECT now()')
                .catch((err) =>{

                    console.log(err);
                    reject(new DBError('Unable to connect DB.'))

                }).finally(() =>{

                    console.log('DB connected.');
                    resolve(true);
                });

            }).catch((err) =>{

                console.log('Migration error.');
                reject(new DBError(err));
            });

        })
    }
}

const db = new DB();
export default db;