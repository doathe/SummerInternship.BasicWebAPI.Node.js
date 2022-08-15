import express from 'express';
import config from '../config';
import * as http from 'http';
import userController from './controller/user-controller';
import bodyParser from 'body-parser';
import errorMiddleware from '../src/middleware/error-middleware';
import DB from './db/db';

class App{
    app: express.Application;

    server: http.Server;
    appRouter: express.Router;
    userController: any;
    bodyParser = require("body-parser");
    
    constructor(){
        this.app = express();

        this.server = http.createServer();
        this.appRouter = express.Router();
    }

    init(){
        return new Promise((resolve, reject) => {
            try{
                this.app.use(bodyParser.urlencoded({ extended: false }));
                this.app.use(bodyParser.json());
                this.routeConfig();
                DB.start();
            } catch(error){
                console.log(error);
            } finally{
                this.app.use(errorMiddleware);
                resolve(true);
            }
        }).catch((err: Error) => {
            console.log('Unable to run.');
            process.exit(1);
        });
    }

    listen(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.server = http.createServer(this.app);
            this.server.on('error', (err: Error) => {
                reject(err);
                process.exit(2);
            });
            this.server.listen(config.port,()=>{
                console.log("Server is running");
                resolve(true);
            });
        });
    };

    routeConfig(){
        this.app.use("", this.appRouter);
        this.appRouter.use("/user", userController);
    }
}

const app = new App();
export default app;