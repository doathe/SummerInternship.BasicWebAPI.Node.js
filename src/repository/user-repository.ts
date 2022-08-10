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

    getUserById(userId: string): Promise<any>{ //Edited, OK
        return new Promise((resolve, reject) =>{

            try{
                /*this.users.forEach(user => {
                    if(userId == user.id){
                        resolve(user);
                    }
                    else reject(new userNotFound('User not found.'));
                });*/
                var index = this.users.find(user => user.id == userId);

                  resolve(index);

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

                    const index = this.users.find(user => user.email == userEmail);
                        if(index){
                            resolve(true);
                        }
                        else if(index == null)
                            resolve(false);

                } catch(error){
                    console.log(error);
                    reject(new processError());
                }
            });
    }

    updateUserById(userId: string,updatedUser: userModel): Promise<string>{ //Edited, OK
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

                var index = this.users.findIndex(user => user.id == userId);
                    if(this.users[index].id == userId){

                        this.users[index].name = updatedUser.name;
                        this.users[index].surname = updatedUser.surname;
                        this.users[index].email = updatedUser.email;
                        this.users[index].age = updatedUser.age;
                        resolve(userId);
                    }

                /*var index = this.users.find(user => user.id == userId);
                    if(index.id == userId){
                        const user = index
                            user.name = updatedUser.name;
                            user.surname = updatedUser.surname;
                            user.email = updatedUser.email;
                            user.age = updatedUser.age;
                            resolve(user);
                    }*/

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

                var index = this.users.findIndex(user => user.id == userId);
                    if(this.users[index].id == userId){

                        this.users.splice(index,1);
                            resolve(userId);
                    }
            } catch(error){
                console.log(error);
                reject(new processError());
            }
        });
    }

    userCheck(userCheck: userModel): Promise<boolean>{ //OK
        return new Promise((resolve, reject) =>{
            try{
                const index = this.users.find(user => user.id == userCheck.id);
                    if(index){
                        resolve(true);
                    }
                    else if(index == null)
                        resolve(false);

            } catch(error){
                console.log(error);
                reject(new processError());
            }
        });
    }
}