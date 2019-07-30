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
        console.log(this.stringID + "string")
        console.log(this.user.uid + "user")
    }   

    get getUID():string{
        console.log(this.stringID + "get")
        return this.stringID
    }

    getUser(){
        let x = this.user.username
        return x;
    }
}