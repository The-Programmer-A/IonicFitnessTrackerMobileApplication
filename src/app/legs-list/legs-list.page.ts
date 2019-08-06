import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';

 
@Component({
  selector: 'app-legs-list',
  templateUrl: './legs-list.page.html',
  styleUrls: ['./legs-list.page.scss'],
})
export class LegsListPage implements OnInit {


  selectedvalue: string = "";
  legsTrainingList: Array<{ exerciseName: any }> = [];
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
    this.legsTrainingList.push({ exerciseName: "Squats" });
    this.legsTrainingList.push({ exerciseName: "Stiff Leg Deadlifts" });
    this.legsTrainingList.push({ exerciseName: "Front Squats" });
    this.legsTrainingList.push({ exerciseName: "Box Squats" });
    this.legsTrainingList.push({ exerciseName: "Hamstring Curls" });
    this.legsTrainingList.push({ exerciseName: "Leg Extensions" });


    for (let i = 0; i < this.legsTrainingList.length; i++) {
      var str = JSON.stringify(this.legsTrainingList[i])
      console.log(this.legsTrainingList[i])
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
    this.legsTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.legsTrainingList.length; i++) {
      console.log(this.legsTrainingList[i])
    }
  }

  delete(number) { //number is the obj passed thorugh
    for (let i = 0; i < this.legsTrainingList.length; i++) {
      if (typeof (number) != "undefined") {
        for (let i = 0; i < this.legsTrainingList.length; i++) {
          if (this.legsTrainingList[i] == number) {
            this.legsTrainingList.splice(i, 1);
          }
        }
      }
    }
  }

}
