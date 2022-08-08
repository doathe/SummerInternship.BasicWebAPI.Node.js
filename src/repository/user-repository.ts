import { userModel } from "../model/user-model";
import shortid from "shortid";
import express from "express";
import updateUser from "../model/update-user-model"
import HttpException from "../exception/http-exception";

export default class userRepository {

    users: Array<userModel>;
    updateUser: updateUser;

    constructor(){
        this.users = [];
        this.updateUser = new updateUser();
    }
    
    addUser(user: userModel): Promise<string>{
        return new Promise((resolve, reject) =>{

            try{
                user.id = shortid.generate();
                this.users.push(user);

                this.users.forEach(user => {
                    console.log(user);
                });
            } catch(error){
                console.log(error);
            } finally{
                resolve(user.id);
            }
        });
    }

    getUser(): Promise<userModel[]>{
        return new Promise((resolve, reject) =>{

            try{
            } catch(error){
                console.log(error);
            } finally{
                resolve(this.users);
            }
        });
    }

    getUserById(userId: string): Promise<userModel>{
        return new Promise((resolve, reject) =>{

            try{
                this.users.forEach(user => {
                    if(userId == user.id){
                        resolve(user);
                    }
                    else{
                        reject(new HttpException(500, 'Invalid user informations.'));
                    }
                });
            } catch(error){
                console.log(error);
            }
        });
    }

    getUserByEmail(userEmail: string): Promise<string>{ //Edit
        return new Promise((resolve, reject) =>{

                try{
                    this.users.forEach(user => {
                        if(userEmail == user.email){
                            resolve(userEmail);
                        }
                    }); 
                } catch(error){
                    console.log(error);
                }
            });
    }

    updateUserById(userId: string,updatedUser: userModel): Promise<userModel>{
        return new Promise((resolve, reject) =>{

            try{
                this.users.forEach(user => {
                    if(userId == user.id){
                        console.log(user.id);
                        user.name = updatedUser.name;
                        user.surname = updatedUser.surname;
                        user.email = updatedUser.email;
                        user.age = updatedUser.age;

                        resolve(user);
                    }
                    else{
                        reject(new HttpException(500, 'Invalid user informations.'));
                    }
                });
            } catch(error){
                console.log(error);
            }
        })
    }

    removeUserById(userId: string): Promise<string>{
        return new Promise((resolve, reject) =>{

            try{
                for(let i=0;i<this.users.length;i++){
                    if(this.users[i].id == userId){
                        this.users.splice(i,1);
                        resolve(userId);
                    }
                    else{
                        reject(new HttpException(500, 'Invalid user informations.'));
                    }
                }
            } catch(error){
                console.log(error);
            }
        });
    }
}