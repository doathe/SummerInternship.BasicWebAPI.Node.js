import { userModel } from "../model/user-model";
import { processError, userNotFound } from "../common/http-exception";
import { successRes, userCreated, usersListed, userListedbyId, userUpdatedbyId, userRemovedbyId } from "../common/success";
import db from "../db/db";

export default class userRepository {
    
    addUser(newUser: userModel): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            db.knx("user").insert(newUser).returning("id")
            .then((user) =>{                                                            //row length kontrol et
                if(user[0]){
                    resolve(new userCreated(user[0].id));
                } else 
                    reject(new userNotFound());
            
            }).catch((error) =>{
                console.log(error);
                reject(new processError());
            });       
        });
    };
    
    getUser(): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            db.knx("user").select("*")
            .then((users) =>{
                resolve(new usersListed(users));
            }).catch((error) =>{
                console.log(error);
                reject(new processError());
            });
        });
    }

    getUserById(userId: number): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            db.knx("user").select("*").where("id", userId)

            .then((user) =>{
                if(user[0]){
                    resolve(new userListedbyId(user[0]));
                } else 
                    reject(new userNotFound());
                
            }).catch((error) =>{
                console.log(error);
                reject(new processError());
            });
        });
    }

    getUserByEmail(userEmail: string): Promise<boolean>{
        return new Promise((resolve, reject) =>{

                db.knx("user").select("*").where("email", userEmail)

                .then((user) =>{
                    if(user[0]){
                        resolve(true);
                    } else 
                        resolve(false);
                }).catch((error) =>{
                    console.log(error);
                    reject(new processError());
                });
            });
    }

    updateUserById(userId: number,updatedUser: userModel): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            db.knx("user").where("id", userId).update(updatedUser).returning("id")

            .then((user) =>{                                                        //user length 0dan büyük mü
                if(user[0]){
                    resolve(new userUpdatedbyId(user[0].id));
                } else 
                    reject(new userNotFound());
            }).catch((error) =>{
                console.log(error);
                reject(new processError());
            })  
        })
    }

    removeUserById(userId: number): Promise<successRes>{
        return new Promise((resolve, reject) =>{

            db.knx("user").where("id", userId).del()
            .then(() =>{
                resolve(new userRemovedbyId(userId));
            }).catch((error) =>{
                console.log(error);
                reject(new processError());
            })
        });
    }

    userCheck(userId: number): Promise<boolean>{
        return new Promise((resolve, reject) =>{

            db.knx("user").select("*").where("id", userId)

                .then((user) =>{
                    if(user[0]){
                        resolve(true);
                    }
                    else
                        resolve(false);
                }).catch((error) =>{
                    console.log(error);
                    reject(new processError());
                });
        });
    }
}