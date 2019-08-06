import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';

 
@Component({
  selector: 'app-cardio-list',
  templateUrl: './cardio-list.page.html',
  styleUrls: ['./cardio-list.page.scss'],
})
export class CardioListPage implements OnInit {

  selectedvalue: string = "";
  cardioTrainingList: Array<{ exerciseName: any }> = [];
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
    this.cardioTrainingList.push({ exerciseName: "Tredmill" });
    this.cardioTrainingList.push({ exerciseName: "Cross Trainer" });
    this.cardioTrainingList.push({ exerciseName: "Stair Machine" });
    this.cardioTrainingList.push({ exerciseName: "Bike" });
    this.cardioTrainingList.push({ exerciseName: "Rowing Machine" });
    this.cardioTrainingList.push({ exerciseName: "Boxing" });


    for (let i = 0; i < this.cardioTrainingList.length; i++) {
      var str = JSON.stringify(this.cardioTrainingList[i])
      console.log(this.cardioTrainingList[i])
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
    this.cardioTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.cardioTrainingList.length; i++) {
      console.log(this.cardioTrainingList[i])
    }
  }

  delete(number) { //number is the obj passed thorugh
    for (let i = 0; i < this.cardioTrainingList.length; i++) {
      if (typeof (number) != "undefined") {
        for (let i = 0; i < this.cardioTrainingList.length; i++) {
          if (this.cardioTrainingList[i] == number) {
            this.cardioTrainingList.splice(i, 1);
          }
        }
      }
    }
  }


}
