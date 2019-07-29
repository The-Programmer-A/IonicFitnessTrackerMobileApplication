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
  backTrainingList: Array<{ exerciseName: any }> = [];

  newSet: Array<{ id: number, weight: number, reps: number }> = []


  constructor(
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService
  ) {
  }


  ngOnInit() {
    this.backTrainingList.push({ exerciseName: "Barbell Rows" });
    this.backTrainingList.push({ exerciseName: "Dumbell Rows" });
    this.backTrainingList.push({ exerciseName: "Deadlifts" });
    this.backTrainingList.push({ exerciseName: "Lat Pulldowns" });
    this.backTrainingList.push({ exerciseName: "Lat Machine Rows" });
    this.backTrainingList.push({ exerciseName: "Pull Ups" });


    for (let i = 0; i < this.backTrainingList.length; i++) {
      var str = JSON.stringify(this.backTrainingList[i])
      console.log(this.backTrainingList[i])
    } 
  }

  exerciseRecorder() {

    console.log()
    // this.afstore.doc(`users/${this.user.getUID()}`).update({
    //   exerciseRecord: firestore.FieldValue.arrayUnion({
    //     exercise
    //   })
    // })
    for (let i = 0; i < this.backTrainingList.length; i++) {
      // console.log(this.backTrainingList[i])
      // if(){

      // }
    }

    this.router.navigate(['/exercise-recorder'])
  }



}
