import { userModel } from "./user-model";

export default class updateUser implements userModel{

    readonly id!: string;

    _name = '';
    _surname = '';
    _email = '';
    _age = 0;

    set name(updatedName: string) {
        this._name = updatedName;
    }
    set surname(updatedSurname: string) {
        this._surname = updatedSurname;
    }
    set email(updatedEmail: string) {
        this._email = updatedEmail;
    }
    set age(updatedAge: number) {
        this._age = updatedAge;
    }
}