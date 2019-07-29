import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';



@Component({
  selector: 'app-back-list',
  templateUrl: './back-list.page.html',
  styleUrls: ['./back-list.page.scss'],
})
export class BackListPage implements OnInit {

  selectedvalue: string = "";

  constructor(
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() { 
  }

  exerciseRecorder(label){

    console.log(label)
    // this.afstore.doc(`users/${this.user.getUID()}`).update({
    //   exerciseRecord: firestore.FieldValue.arrayUnion({
    //     exercise
    //   })
    // })
    this.router.navigate(['/exercise-recorder'])
  }

}
