import knex, {Knex} from "knex";
import config from "../../config";
import { DBError } from "../common/http-exception";

class DB{

    config: Knex.Config = {
        client: 'pg',
        connection: {
            host: config.PG_host,
            user: config.PG_user,
            password: config.PG_pass,
            database: config.PG_db,
            port: config.PG_port,
        },
        pool:{min:0, max:7},
        migrations:{
            directory: __dirname + "/migrations",
            tableName: "knex_user_migrations"
        }
    }

    knx: Knex = knex(this.config);

    start(): Promise<boolean>{
        return new Promise<boolean>(async (resolve,reject) =>{

            this.knx.migrate.latest();
                console.log("Migration completed.");

                await this.knx.raw('SELECT now()').then(() =>{
                    console.log('DB connected.');
                    resolve(true);
                })
                .catch((err) =>{

                    console.log(err);
                    reject(new DBError('Unable to connect DB.'))

                })
        })
    }
}

const db = new DB();
export default db;