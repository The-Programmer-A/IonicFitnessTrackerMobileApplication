import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.page.html',
  styleUrls: ['./new-record.page.scss'],
})
export class NewRecordPage implements OnInit {

  userPosts: any

  constructor(
    public afstore: AngularFirestore,
    public user: UserService,
    public router: Router
  ) { 
    const posts = afstore.doc(`users/${user.getUID}`) //this gets the information tied to a users UID from firebase
    this.userPosts = posts.valueChanges() //gets us the data
   }

  ngOnInit() {
  }

  enterToFirebase(){
    this.afstore.doc(`users/${this.user.getUID}`).update({
      posts: firestore.FieldValue.arrayUnion({
        //all the items you want to store
      })
    })
  }

  newWorkout(){
    //functionality that allows to create a new workout
    this.router.navigate(['./select-muscle-group'])
  }

}
