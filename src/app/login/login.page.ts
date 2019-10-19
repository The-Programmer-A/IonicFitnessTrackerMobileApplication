import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";
  userFirstName: any;
  userLastName: any;

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController, 
    public router: Router,
    public route: ActivatedRoute,
    public user: UserService
    ) { }

  ngOnInit() {

  }
 
  register(){
    //take you to the register page
    this.router.navigate(['/register'])
  }

  //need to ensure that the user name and password is in the 
  async login(){
    const { username, password} = this;
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);

    try{
      //uses firebase authenticator to try and sign in with a given username and password (authorize the user through firebase)
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + "@gmail.com", password) 
  
      if(res.user){ //if the user exists in the database
        this.user.setUser({ //set the user for local use
          username,
          uid: res.user.uid
        })

        this.showAlert("Loggin Successful", "Welcome " + username + "!")
        this.router.navigate(['/tabs'])
      }

    }catch(err){
        console.dir(err);
        this.showAlert("Error!", err.message)
    }
  }

/**
 * gives a pop up alert when the users have done some type of invalid input
 * @param header header message of the pop up 
 * @param message message of the pop up
 */
  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header, 
      message,
      buttons: ["OK"]
    })

    await alert.present()
  }

}
