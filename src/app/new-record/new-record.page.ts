import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.page.html',
  styleUrls: ['./new-record.page.scss'],
})
export class NewRecordPage implements OnInit {
  //title = "working"
  userPosts
  workout: any;
  eventList: any[]
  workoutToday = false

  constructor(
    public afstore: AngularFirestore,
    public user: UserService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    //gaining infomration from an incoming source
    this.route.queryParams.subscribe(params => {
      console.log('params: ', params);
       if (params && params.date) {
        this.workoutToday = true
       }
    });

    const posts = this.afstore.doc(`users/${this.user.getUID}`) //this gets the information tied to a users UID from firebase
    console.log(this.user.getUID + "this is the UID") //this gets the uid
    // Turns the information gained from the database into an observable. The handling of this data is processed using a async pipe in HTML
    this.userPosts = posts.valueChanges() 
  }

  ngOnInit() {
    this.workoutToday = false;
  }

  /**routung */
  newWorkout() {
    //functionality that allows to create a new workout
    this.router.navigate(['./select-muscle-group'])
  }

}
