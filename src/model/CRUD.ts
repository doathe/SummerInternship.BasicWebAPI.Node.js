import { userModel } from "./user-model";
import { successRes } from "../common/success";

export interface CRUD{
    create: (resource: userModel) => Promise<successRes>,
    getUsers: () => Promise<successRes>,
    getUserById: (resourceId: number) => Promise<successRes>,
    updateById: (resourceId: number,resource: userModel) => Promise<successRes>,
    deleteById: (resourceId: number) => Promise<successRes>,
}

/*export interface CRUDRepo{
    addUser: (resource: userModel) => Promise<string>,
    getUser: () => Promise<userModel>,
    getUserById: (resourceId: string) => Promise<userModel>,
    getUserByEmail: (resourceId: string) => Promise<userModel>,
    updateUserById: (resourceId: string,resource: userModel) => Promise<string>,
    removeUserById: (resourceId: string) => Promise<string>,
}*/