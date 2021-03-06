import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

import { AlertController } from '@ionic/angular'
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string =""
  firstname: string =""
  lastname: string=""
  password: string =""
  cpass: string =""
 

  constructor(
    public afAuth: AngularFireAuth, 
    public alert: AlertController, 
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  /**
   * routing
   */
  signin(){
    this.router.navigate(['/login'])
  }

  /**
   * this method handels registering user information in to the firebase authenticator. 
   * any invalid inputs will be handeled by the alert pop up helper
   */
  async register(){
    const { username, password, cpass} = this


    if(password != cpass){
      this.showAlert("Error!", "Passwords don't match")
      return console.error("Passwords don't match")
    }

    try{
      //creating the user in the firebase authenticator
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + "@gmail.com", password)
      //storing the username into the database for a spesific user
      this.afstore.doc(`users/${res.user.uid}`).set({ 
        username,
      })
      //create a local store of the user for future CRUD 
      this.user.setUser({
        username,
        uid: res.user.uid
      })
      this.showAlert("Account Created!", "Please sign in")
      this.router.navigate(['/login'])

    }catch(err){
      console.dir(err)
      this.showAlert("Error!", err.message)
    }
  }

  /**
   * Alert box that lets the user know about any invalid inputs.
   * @param header header message to display on the pop up
   * @param message message to display on the pop up
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
