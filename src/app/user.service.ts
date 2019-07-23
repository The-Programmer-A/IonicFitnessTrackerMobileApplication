import { Injectable } from '@angular/core'; //used to make this service injectable into other componets

interface user {
    username: string,
    uid: string
}


@Injectable()
export class UserService {
    private user: user

    constructor(){

    }

    setUser(user: user){
        this.user = user;
    }

    getUID(){
        return this.user.uid
    }

    getUser(){
        let x = this.user.username
        return x;
    }
}