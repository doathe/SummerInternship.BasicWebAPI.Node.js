import express from 'express';
import userService from '../service/user-service';
import baseRouter from './base-router';
import validationJoi from '../validation/validation-joi';

class userController implements baseRouter{
    router: express.Router;

    constructor(){
        this.router = express.Router();
        this.routes();
    }

    routes():void{
        this.router.get('/healtcheck', (req: express.Request, res: express.Response) =>{
            res.status(200).send(`Get received.`)
        });
        this.router.get('/', this.getUsers);
        this.router.post('/', this.createUser);
        this.router.get(`/:userId`, this.getUserById);
        this.router.delete(`/:userId`, this.removeUser);
        this.router.put(`/:userId`, this.putUser);
    }

    getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {

        userService.getUsers().then((succ_res) => {
            res.json(succ_res);
        }).catch((err: Error) => {
            console.log('Error listing.');
            next(err);
        })
    }

    getUserById(req: express.Request, res: express.Response, next: express.NextFunction){

        validationJoi.IdCheckSchema.validateAsync(req.params.userId).then((userId) =>{

            userService.getUserById(userId).then((succ_res) =>{
                res.json(succ_res);
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

    createUser(req: express.Request, res: express.Response, next: express.NextFunction){

        validationJoi.userCreateSchema.validateAsync(req.body).then((newUser) =>{

            userService.create(newUser).then((succ_res) =>{
                res.json(succ_res);
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

    putUser(req: express.Request, res: express.Response, next: express.NextFunction){

        /*const userId:string = req.params.userId;
        const requestData:any = {Id:userId, ...req.body}; //interface*/

        validationJoi.IdCheckSchema.validateAsync(req.params.userId).then((userId) =>{

            validationJoi.userUpdateSchema.validateAsync(req.body).then((newUser) =>{
                
                userService.updateById(userId,newUser).then((succ_res) =>{
                    res.json(succ_res);
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

    removeUser(req: express.Request, res: express.Response, next: express.NextFunction){

        validationJoi.IdCheckSchema.validateAsync(req.params.userId).then((userId) =>{

            userService.deleteById(userId).then((succ_res) =>{
                res.json(succ_res);
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