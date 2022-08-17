import { userModel } from "../model/user-model";

export class successRes{
    
    data?: any;
    message?: string;

    constructor(message?: string, data?:any){

      this.data = data;
      this.message = message;
    }
}
    export class userCreated extends successRes{

      constructor(id:number, message?:string){

        message = message || `User with id: ${id} created.`;
        super(message);
      }
    }

    export class usersListed extends successRes{  //Count gelecek.

        constructor(users: userModel[], message?:string){
          
          message = message || `All users listed.`;
          super(message,users);
        }
    }

    export class userListedbyId extends successRes{

        constructor(user: userModel|undefined, message?:string){
          
          message = message || `User with id: ${user?.id} listed.`;
          super(message,user);
        }
    }

    export class userUpdatedbyId extends successRes{

        constructor(id:number, message?:string){
          
          message = message || `User with id: ${id} updated.`;
          super(message);
        }
    }

    export class userRemovedbyId extends successRes{

        constructor(id: number, message?:string){
        
            message = message || `User with id: ${id} removed.`;
            super(message);
          }
    }