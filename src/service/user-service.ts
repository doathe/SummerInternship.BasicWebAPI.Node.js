import express from 'express';
import { userModel } from '../model/user-model';
import userRepository from '../repository/user-repository';
import { CRUD } from '../model/CRUD';
import HttpException, { processError, userNotFound, userAlreadyExist } from '../common/http-exception';
import { successRes } from '../common/success';

class userService implements CRUD{

    userRepo: userRepository;

    constructor(){
        this.userRepo = new userRepository();
    }

    create(resource: userModel): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            this.userRepo.getUserByEmail(resource.email).then((exist) =>{
                if(exist == false){
                        this.userRepo.addUser(resource).then((user) =>{
                        resolve(user);
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

    getUsers(): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            this.userRepo.getUser().then((user) =>{
                resolve(user);
            }).catch((err: Error) =>{
                console.log('List error.');
                reject(err);
            });
        });
    }

    getUserById(resourceId: number): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            this.userRepo.userCheck(resourceId).then((exist) =>{
                if(exist == true){
                    this.userRepo.getUserById(resourceId).then((succ_res) =>{
                        resolve(succ_res);
                    }).catch((err: Error) =>{
                        console.log('List error.');
                        reject(err);
                    })
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

    updateById(resourceId: number, resource: userModel): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            this.userRepo.userCheck(resourceId).then((exist) =>{
                if(exist == true){
                    this.userRepo.getUserByEmail(resource.email).then((exist) =>{
                        if(exist == false){
                                this.userRepo.updateUserById(resourceId,resource).then((succ_res) =>{
                                resolve(succ_res);
                            }).catch((err: Error) =>{
                                console.log('Update error.');
                                reject(err);
                            }); 
                        }
                        else{
                            reject(new userAlreadyExist());
                        }
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

    deleteById(resourceId: number): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            this.userRepo.userCheck(resourceId).then((exist) =>{
                if(exist == true){
                    this.userRepo.removeUserById(resourceId).then((succ_res) =>{
                        resolve(succ_res);
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