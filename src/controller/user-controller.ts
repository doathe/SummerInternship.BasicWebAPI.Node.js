import express from 'express';
import userService from '../service/user-service';
import baseRouter from './base-router';
import validationJoi from '../validation/validation-joi';
import errorMiddleware from '../middleware/error-middleware';
import HttpException from '../exception/http-exception';

class userController implements baseRouter{
    router: express.Router;

    constructor(){
        this.router = express.Router();
        this.routes();
    }

    routes():void{
        this.router.get('/healtcheck', (req: express.Request, res: express.Response) => {
            res.status(200).send(`Get received.`)
        });
        this.router.get('/', this.getUsers);
        this.router.post('/', this.createUser);
        this.router.get(`/:userId`, this.getUserById);
        this.router.delete(`/:userId`, this.removeUser);
        this.router.put(`/:userId`, this.putUser);
    }

    getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {

        userService.getUsers().then((users) => {
            return res.status(200).send(users);
        }).catch((err: Error) => {
            console.log('Error listing.');
            next(err);
        })
    }

    getUserById(req: express.Request, res: express.Response, next: express.NextFunction){ //ASK?

        validationJoi.IdCheckSchema.validateAsync(req.params.userId).then((userId) =>{

            userService.getUserById(userId).then((user) =>{
                return res.status(200).send(user);
            }).catch((err: Error) => {
                console.log('Error getting user by ID.');
                next(err);
            });
        })
        .catch((err: Error) =>{
            console.log('Error validating.');
            next(err);
        });
    }

    createUser(req: express.Request, res: express.Response, next: express.NextFunction){ //OK

        validationJoi.userCreateSchema.validateAsync(req.body).then((newUser) =>{

            userService.create(newUser).then(() =>{

                return res.status(201).send('User created.');
            }).catch((err: Error) => {
                console.log('Error creating user.');
                next(err);
            });
        })
        .catch((err: Error) =>{
            console.log('Error validating.');
            next(err);
        });
    }

    putUser(req: express.Request, res: express.Response, next: express.NextFunction){ //ASK?

        /*const userId:string = req.params.userId;
        const requestData:any = {Id:userId, ...req.body}; //interface*/

        validationJoi.IdCheckSchema.validateAsync(req.params.userId).then((userId) =>{

            validationJoi.userUpdateSchema.validateAsync(req.body).then((newUser) =>{
                
                userService.updateById(userId,newUser).then(() =>{
                    return res.status(200).send(`User updated.`);
                }).catch((err: Error) => {
                    console.log('Error updating.');
                    next(err);
                });
            })
            .catch((err: Error) =>{
                console.log('Error validating.');
                next(err);
            });
        })
        .catch((err:Error ) =>{
            console.log('Error validating.');
            next(err);
        });
    }

    removeUser(req: express.Request, res: express.Response, next: express.NextFunction){ //OK

        validationJoi.IdCheckSchema.validateAsync(req.params.userId).then((userId) =>{

            userService.deleteById(userId).then((userId) =>{
                return res.status(200).send(`${userId} User deleted.`);
            }).catch((err: Error) => {
                console.log('Error removing user.');
                next(err);
            });
        })
        .catch((err: Error) =>{
            console.log('Error validating.');
            next(err);
        });
    }
}

const usercontroller = new userController();
export default usercontroller.router;