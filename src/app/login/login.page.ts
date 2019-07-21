import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController, 
    public router: Router
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
      //kind of a hack 
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + "@gmail.com", password)
      //show a success
      this.showAlert("Loggin Successful", "Entering FitnessApplication")
      this.router.navigate(['/tabs'])
    }catch(err){
        console.dir(err);
        this.showAlert("Error!", err.message)
    }
  }


  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header, 
      message,
      buttons: ["OK"]
    })

    await alert.present()
  }

}
