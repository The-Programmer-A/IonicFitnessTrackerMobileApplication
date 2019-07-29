import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-back-list',
  templateUrl: './back-list.page.html',
  styleUrls: ['./back-list.page.scss'],
})
export class BackListPage implements OnInit {

  selectedvalue: string = "";
  backTrainingList: Array<{ exerciseName: any }> = [];
  loggingExercise: string

  newSet: Array<{ id: number, weight: number, reps: number }> = []


  constructor(
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    public alretController: AlertController
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

  exerciseRecorder(number) {

    console.log(number)
    // this.afstore.doc(`users/${this.user.getUID()}`).update({
    //   exerciseRecord: firestore.FieldValue.arrayUnion({
    //     exercise
    //   })
    // })

    this.loggingExercise = number.exerciseName;

    let inputData: NavigationExtras = {
      queryParams: {
        exercise: this.loggingExercise
      }
    }

    this.router.navigate(['/exercise-recorder'], inputData)
  }

  async newExercise() {
    const alert = await this.alretController.create({
      header: 'Somethig!',
      inputs: [
        {
          name: "input",
          type: "text",
          placeholder: 'Create New Exercise..'
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('confirm cancel')
          }
        }, {
          text: "Ok",
          handler: () => {
            console.log("confim OK")
          }
        }
      ]
    });

    await alert.present()
    let result = await alert.onDidDismiss();
    const newex = result.data.values.input;
    this.addNewExercise(newex);
  }


  //GOING TO NEED SOMETHING TO DELETE NEW EXERCISES.
  addNewExercise(string) {
    this.backTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.backTrainingList.length; i++) {
      console.log(this.backTrainingList[i])
    }
  }

  delete(number) { //number is the obj passed thorugh
    for (let i = 0; i < this.backTrainingList.length; i++) {
      if (typeof (number) != "undefined") {
        for (let i = 0; i < this.backTrainingList.length; i++) {
          if (this.backTrainingList[i] == number) {
            this.backTrainingList.splice(i, 1);
          }
        }
      }
    }
  }



}
