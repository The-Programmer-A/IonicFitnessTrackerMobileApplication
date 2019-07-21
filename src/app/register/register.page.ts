import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string =""
  password: string =""
  cpass: string =""


  constructor(
    public afAuth: AngularFireAuth, 
    public alert: AlertController, 
    public router: Router
    ) { }

  ngOnInit() {
  }


  signin(){
    this.router.navigate(['/login'])
  }


  async register(){
    const { username, password, cpass} = this
    if(password != cpass){
      this.showAlert("Error!", "Passwords don't match")
      return console.error("Passwords don't match")
    }

    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + "@gmail.com", password)
      console.log(res)
      this.showAlert("Success!", "Welcome!")
      this.router.navigate(['/login'])
    }catch(err){
      console.dir(err)
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
