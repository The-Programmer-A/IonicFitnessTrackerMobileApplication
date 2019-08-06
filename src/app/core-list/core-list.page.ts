import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-core-list',
  templateUrl: './core-list.page.html',
  styleUrls: ['./core-list.page.scss'],
})
export class CoreListPage implements OnInit {
  selectedvalue: string = "";
  coreTrainingList: Array<{ exerciseName: any }> = [];
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
    this.coreTrainingList.push({ exerciseName: "Plank" });
    this.coreTrainingList.push({ exerciseName: "Crunches" });
    this.coreTrainingList.push({ exerciseName: "Sit Ups" });
    this.coreTrainingList.push({ exerciseName: "Hanging Leg Raises" });
    this.coreTrainingList.push({ exerciseName: "Lying Leg Raises" });


    for (let i = 0; i < this.coreTrainingList.length; i++) {
      var str = JSON.stringify(this.coreTrainingList[i])
      console.log(this.coreTrainingList[i])
    }
  }

  exerciseRecorder(number) {

    console.log(number)


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
      header: 'New Exercise!',
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
    this.coreTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.coreTrainingList.length; i++) {
      console.log(this.coreTrainingList[i])
    }
  }

  delete(number) { //number is the obj passed thorugh
    for (let i = 0; i < this.coreTrainingList.length; i++) {
      if (typeof (number) != "undefined") {
        for (let i = 0; i < this.coreTrainingList.length; i++) {
          if (this.coreTrainingList[i] == number) {
            this.coreTrainingList.splice(i, 1);
          }
        }
      }
    }
  }


}
