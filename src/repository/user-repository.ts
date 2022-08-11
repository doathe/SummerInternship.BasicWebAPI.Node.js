import { userModel } from "../model/user-model";
import shortid from "shortid";
import updateUser from "../model/update-user-model"
import { processError, userNotFound } from "../common/http-exception";
import { successRes, userCreated, usersListed, userListedbyId, userUpdatedbyId, userRemovedbyId } from "../common/success";

export default class userRepository {

    users: Array<userModel>;
    updateUser: updateUser;

    constructor(){
        this.users = [];
        this.updateUser = new updateUser();
    }
    
    addUser(user: userModel): Promise<successRes>{ //OK
        return new Promise((resolve, reject) =>{

            try{
                user.id = shortid.generate();
                this.users.push(user);

                this.users.forEach(user => {
                    console.log(user);
                });

                resolve(new userCreated(user.id));
            } catch(error){
                console.log(error);
                reject(new processError());
            }
        });
    }

    getUser(): Promise<successRes>{ //OK
        return new Promise((resolve, reject) =>{

            try{
                //resolve(this.users);
                if(this.users != null){                                                         //ASK??
                resolve(new usersListed(this.users));
                }
                else reject(new userNotFound());
            } catch(error){
                console.log(error);
                reject(new processError());
            }
        });
    }

    getUserById(userId: string): Promise<successRes>{ //Edited, OK
        return new Promise((resolve, reject) =>{

            try{
                /*this.users.forEach(user => {
                    if(userId == user.id){
                        resolve(user);
                    }
                    else reject(new userNotFound('User not found.'));
                });*/
                var obj = this.users.find(user => user.id == userId);

                  //resolve(obj);
                  resolve(new userListedbyId(obj,userId));

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

    updateUserById(userId: string,updatedUser: userModel): Promise<successRes>{ //Edited, OK, bulunamazsa -1 döner.
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
                        //resolve(userId);
                        resolve(new userUpdatedbyId(this.users[obj],userId));
                    }
            } catch(error){
                console.log(error);
                reject(new processError());
            }
        })
    }

    removeUserById(userId: string): Promise<successRes>{ //Edited, OK
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
                            //resolve(userId);
                            resolve(new userRemovedbyId(userId));

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