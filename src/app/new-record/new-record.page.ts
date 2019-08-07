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
  //title = "working"
  userPosts
  workout: Array<{}> = [];

  constructor(
    public afstore: AngularFirestore,
    public user: UserService,
    public router: Router
  ) {
    const posts = this.afstore.doc(`users/${this.user.getUID}`) //this gets the information tied to a users UID from firebase

    console.log(this.user.getUID + "this is the UID") //this gets the uid
    this.userPosts = posts.valueChanges()
    // this.userPosts = posts.valueChanges().subscribe((value: any) => {
    //     console.log(JSON.stringify(value))
    
    // })

  }

  ngOnInit() {

    // // for (let i = 0; i < this.backTrainingList.length; i++) {
    // //   var str = JSON.stringify(this.backTrainingList[i])
    // //   console.log(this.backTrainingList[i])
    // // }



    // this.afstore.collection('FitnessTracker').snapshotChanges();

  }

  enterToFirebase() {
    this.afstore.doc(`users/${this.user.getUID}`).update({
      posts: firestore.FieldValue.arrayUnion({
        //all the items you want to store
      })
    })
  }

  newWorkout() {
    //functionality that allows to create a new workout
    this.router.navigate(['./select-muscle-group'])
  }

  checkDate() {
    console.log("sodifhsaodf")
  }

}
