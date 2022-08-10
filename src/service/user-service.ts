import express from 'express';
import { userModel } from '../model/user-model';
import userRepository from '../repository/user-repository';
import { CRUD } from '../model/CRUD';
import HttpException, { processError, userNotFound, userAlreadyExist } from '../exception/http-exception';

class userService implements CRUD{

    userRepo: userRepository;

    constructor(){
        this.userRepo = new userRepository();
    }

    create(resource: userModel): Promise<string>{
        return new Promise((resolve, reject) =>{

            this.userRepo.getUserByEmail(resource.email).then((exist) =>{
                if(exist == false){
                        this.userRepo.addUser(resource).then((userId) =>{
                        resolve(userId);
                    }).catch((err: Error) =>{
                        console.log('Create error.');
                        reject(err);
                    }); 
                }
                else{
                    reject(new userAlreadyExist());
                }
            }).catch((err: Error) =>{
                console.log('User exist check error.');
                reject(err);
            });
        });
    }

    getUsers(): Promise<userModel[]>{
        return new Promise((resolve, reject) =>{

            this.userRepo.getUser().then((user) =>{
                resolve(user);
            }).catch((err: Error) =>{
                console.log('List error.');
                reject(err);
            });
        });
    }

    getUserById(resourceId: string): Promise<userModel|undefined>{
        return new Promise((resolve, reject) =>{

            this.userRepo.userCheck(resourceId).then((exist) =>{
                if(exist == true){
                    this.userRepo.getUserById(resourceId).then((user) =>{
                        resolve(user);
                    }).catch((err: Error) =>{
                        console.log('List error.');
                        reject(err);
                    });
                }
                else{
                    console.log('User not found.');
                    reject(new userNotFound());
                }
            }).catch((err: Error) =>{
                console.log('User exist check error.');
                reject(err);
            });
        });
    }

    updateById(resourceId: string, resource: userModel): Promise<string>{
        return new Promise((resolve, reject) =>{

            this.userRepo.userCheck(resourceId).then((exist) =>{
                if(exist == true){
                    this.userRepo.updateUserById(resourceId,resource).then((user) =>{
                        resolve(user);
                    }).catch((err: Error) =>{
                        console.log('Update error.');
                        reject(err);
                    });
                }
                else{
                    console.log('User not found.');
                    reject(new userNotFound());
                }
            }).catch((err: Error) =>{
                console.log('User exist check error.');
                reject(err);
            });
        });
    }

    deleteById(resourceId: string): Promise<string>{
        return new Promise((resolve, reject) =>{

            this.userRepo.userCheck(resourceId).then((exist) =>{
                if(exist == true){
                    this.userRepo.removeUserById(resourceId).then((removedId) =>{
                        resolve(removedId);
                    }).catch((err: Error) =>{
                        console.log('Removed error.');
                        reject(err);
                    });
                }
                else{
                    console.log('User not found.');
                    reject(new userNotFound());
                }
            }).catch((err: Error) =>{
                console.log('User exist check error.');
                reject(err);
            });
        });
    }
}

export default new userService();