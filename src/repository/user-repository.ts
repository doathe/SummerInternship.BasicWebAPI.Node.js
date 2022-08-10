import { userModel } from "../model/user-model";
import shortid from "shortid";
import express from "express";
import updateUser from "../model/update-user-model"
import HttpException, { processError, userNotFound } from "../exception/http-exception";

export default class userRepository {

    users: Array<userModel>;
    updateUser: updateUser;

    constructor(){
        this.users = [];
        this.updateUser = new updateUser();
    }
    
    addUser(user: userModel): Promise<string>{ //OK
        return new Promise((resolve, reject) =>{

            try{
                user.id = shortid.generate();
                this.users.push(user);

                this.users.forEach(user => {
                    console.log(user);
                });

                resolve(user.id);
            } catch(error){
                console.log(error);
                reject(new processError());
            }
        });
    }

    getUser(): Promise<userModel[]>{ //OK
        return new Promise((resolve, reject) =>{

            try{
                resolve(this.users);
            } catch(error){
                console.log(error);
                reject(new processError());
            }
        });
    }

    getUserById(userId: string): Promise<userModel|undefined>{ //Edited, OK
        return new Promise((resolve, reject) =>{

            try{
                /*this.users.forEach(user => {
                    if(userId == user.id){
                        resolve(user);
                    }
                    else reject(new userNotFound('User not found.'));
                });*/
                var obj = this.users.find(user => user.id == userId);

                  resolve(obj);

            } catch(error){
                console.log(error);
                reject(new processError());
            }
        });
    }

    getUserByEmail(userEmail: string): Promise<boolean>{ //OK

        return new Promise((resolve, reject) =>{
                try{
                    /*this.users.forEach(user => {
                        if(userEmail == user.email){
                            return true;
                        }
                        else 
                            return false;
                    }); */

                    const obj = this.users.find(user => user.email == userEmail);
                        if(obj){
                            resolve(true);
                        }
                        else
                            resolve(false);
                } catch(error){
                    console.log(error);
                    reject(new processError());
                }
            });
    }

    updateUserById(userId: string,updatedUser: userModel): Promise<string>{ //Edited, OK, bulunamazsa -1 döner.
        return new Promise((resolve, reject) =>{

            try{
                /*this.users.forEach(user => {
                    if(userId == user.id){
                        console.log(user.id);
                        user.name = updatedUser.name;
                        user.surname = updatedUser.surname;
                        user.email = updatedUser.email;
                        user.age = updatedUser.age;

                        resolve(user);
                    }
                    else reject(new userNotFound());
                });*/

                var obj = this.users.findIndex(user => user.id == userId);
                    if(this.users[obj].id == userId && obj > (-1)){

                        this.users[obj].name = updatedUser.name;
                        this.users[obj].surname = updatedUser.surname;
                        this.users[obj].email = updatedUser.email;
                        this.users[obj].age = updatedUser.age;
                        resolve(userId);
                    }
            } catch(error){
                console.log(error);
                reject(new processError());
            }
        })
    }

    removeUserById(userId: string): Promise<string>{ //Edited, OK
        return new Promise((resolve, reject) =>{

            try{
                /*for(let i=0;i<this.users.length;i++){
                    if(this.users[i].id == userId){
                        this.users.splice(i,1);
                        resolve(userId);
                    }
                    else reject(new userNotFound());
                }*/

                var obj = this.users.findIndex(user => user.id == userId);
                    if(this.users[obj].id == userId && obj > (-1)){

                        this.users.splice(obj,1);
                            resolve(userId);
                    }
            } catch(error){
                console.log(error);
                reject(new processError());
            }
        });
    }

    userCheck(userId: string): Promise<boolean>{ //OK
        return new Promise((resolve, reject) =>{
            try{
                const obj = this.users.find(user => user.id == userId);
                    if(obj){
                        resolve(true);
                    }
                    else
                        resolve(false);

            } catch(error){
                console.log(error);
                reject(new processError());
            }
        });
    }
}