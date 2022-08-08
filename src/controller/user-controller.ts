import express from 'express';
import userService from '../service/user-service';
import baseRouter from './base-router';
//import userValidation from '../middleware/validation';
import userValidationJoi from '../validation/validation-joi';
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
            //return res.status(500).send(`Something went wrong.`);
            next(new HttpException(500, 'Users not found'));
        })
    }

    getUserById(req: express.Request, res: express.Response, next: express.NextFunction){

        userService.getUserById(req.params.userId).then((user) =>{
            return res.status(200).send(user);
        }).catch((err: Error) => {
            console.log('Error getting user by ID.');
            //return res.status(500).send(`Invalid user informations.`);
            next(new HttpException(500, 'Invalid user informations.'));
        });
    }

    createUser(req: express.Request, res: express.Response, next: express.NextFunction){

        userValidationJoi.userSchema.validateAsync(req.body).then((newUser) =>{

            userService.create(newUser).then(() =>{

                return res.status(201).send('User created.');
            }).catch((err: Error) => {
                console.log('Error creating user.');
                //return res.status(500).send(`Invalid user informations.`);
                next(new HttpException(500, 'Invalid user informations.'));
            });
        })
        .catch((err: Error) =>{
            console.log('Error validating.');
            //return res.status(500).send(`Invalid user informations.`);
            next(new HttpException(500, 'Invalid user informations.'));
        });
    }

    putUser(req: express.Request, res: express.Response, next: express.NextFunction){

        userValidationJoi.userSchema.validateAsync(req.body).then((newUser) =>{

            userService.updateById(req.params.userId,newUser).then(() =>{
                return res.status(202).send(`User updated.`);
            }).catch((err: Error) => {
                console.log('Error updating.');
                //return res.status(500).send(`Invalid user informations.`);
                next(new HttpException(500, 'Invalid user informations.'));
            });
        })
        .catch((err: Error) =>{
            console.log('Error validating.');
            //return res.status(500).send(`Invalid user informations.`);
            next(new HttpException(500, 'Invalid user informations.'));
        });
    }

    removeUser(req: express.Request, res: express.Response, next: express.NextFunction){

        userService.deleteById(req.params.userId).then((userId) =>{
            return res.status(202).send(`${userId} User deleted.`);
        }).catch((err: Error) => {
            console.log('Error removing user.');
            //return res.status(500).send(`Invalid user informations.`);
            next(new HttpException(500, 'Invalid user informations.'));
        });
    }
}

const usercontroller = new userController();
export default usercontroller.router;