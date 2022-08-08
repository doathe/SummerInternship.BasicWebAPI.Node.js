import express from "express";
import userService from "../service/user-service";
/*
class userValidation{

    validateRequiredUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){

            if (req.body && req.body.id && req.body.name && req.body.username && req.body.age){
                next();
            }
            else{
                res.status(400).send({error: `Missing required fields.`});
            }
    }

    validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction){

        userService.getUserByEmail(req.body.email).then((user) =>{

            if (user){

                res.status(400).send({error: `User email already exists`});
            } 
            else{

                next();
            }
        }).catch((err: Error) =>{
            console.log('Error listing.');
        });
    }

    validateSameEmailBelongToSameUser(req: express.Request, res: express.Response, next: express.NextFunction){

        userService.getUserByEmail(req.body.email).then((user) =>{

            if (user && user.id === req.params.userId){

                next();
            }
            else{

                res.status(400).send({error: `Invalid email`});
        }
        }).catch((err: Error) =>{
            console.log('Error listing.');
        });
    }

    validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction){
        
        userService.readById(req.params.userId).then((user) =>{

            if (user){

                next();
            } 
            else{

                res.status(404).send({error: `User ${req.params.userId} not found`});
            }
        }).catch((err: Error) => {
            console.log('Error listing.');
        });
    }

    extractUserId(req: express.Request, res: express.Response, next: express.NextFunction){
        req.body.id = req.params.userId;
        next();
}
}
export default new userValidation();
*/




















/*export const userValidation = (schema: ObjectSchema) => {
    return(req:Request, res:Response, next:NextFunction) => {
        return new Promise((resolve, reject) => {
        try{
            schema.validate(req.body);
            next();
        } catch(error){
            console.error(error);
        } finally{
            resolve(true);
        }
        }).catch((err: Error) => {
            console.log('Error listing.');
        });
    }
}

export const Schemas = {
    data: Joi.object({
    })
}*/