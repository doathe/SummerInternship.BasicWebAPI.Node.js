import { userModel } from "../model/user-model";

export class successRes{
    
    data?: any;
    message: string;

    constructor(message: string, data:any){

      this.data = data;
      this.message = message;
    }
}
    export class userCreated extends successRes{

      constructor(id: string, message?:string){

        message = message || `User with id: ${id} created.`;
        super(message,'id: ${id}');                                                                 //?
      }
    }

    export class usersListed extends successRes{

        constructor(users: userModel[], message?:string){
          
          message = message || `All users listed.`;
          super(message,users);
        }
    }

    export class userListedbyId extends successRes{

        constructor(user: userModel|undefined, id:string, message?:string){
          
          message = message || `User with id: ${id} listed.`;
          super(message,user);
        }
    }

    export class userUpdatedbyId extends successRes{

        constructor(user: userModel|undefined, id:string, message?:string){
          
          message = message || `User with id: ${id} updated.`;
          super(message,user);
        }
    }

    export class userRemovedbyId extends successRes{

        constructor(id: string, message?:string){
        
            message = message || `User with id: ${id} removed.`;
            super(message,id);
          }
    }