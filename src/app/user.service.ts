import { Injectable } from '@angular/core'; //used to make this service injectable into other componets

interface user {
    username: string,
    uid: string
}


@Injectable()
export class UserService {
    private user: user
    public   stringID: string

    constructor(){

    }

    setUser(user: user){
        this.user = user;
        this.stringID = user.uid
    }   

    get getUID():string{
        return this.stringID //could try change this to this.user.uid
    }

    getUser(){
        let x = this.user.username
        return x;
    }
}