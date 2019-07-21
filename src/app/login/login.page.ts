import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login(){
    const { username, password} = this;
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);

    try{
      //kind of a hack 
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + "@gmail.com", password)
    }catch(err){
        console.dir(err);
        //i think this should be a user not found error instead
        if(err.code === "auth/operation-not-allowed"){
          console.log("User Not Found")
        }
    }
  }

}
