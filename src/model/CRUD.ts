import { userModel } from "./user-model";

export interface CRUD{
    create: (resource: userModel) => Promise<string>,
    getUsers: () => Promise<userModel[]>,
    getUserById: (resourceId: string) => Promise<userModel|undefined>,
    updateById: (resourceId: string,resource: userModel) => Promise<string>,
    deleteById: (resourceId: string) => Promise<string>,
}

/*export interface CRUDRepo{
    addUser: (resource: userModel) => Promise<string>,
    getUser: () => Promise<userModel>,
    getUserById: (resourceId: string) => Promise<userModel>,
    getUserByEmail: (resourceId: string) => Promise<userModel>,
    updateUserById: (resourceId: string,resource: userModel) => Promise<string>,
    removeUserById: (resourceId: string) => Promise<string>,
}*/