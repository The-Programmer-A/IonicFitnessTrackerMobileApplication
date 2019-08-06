import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';
 
@Component({
  selector: 'app-bicep-list',
  templateUrl: './bicep-list.page.html',
  styleUrls: ['./bicep-list.page.scss'],
})
export class BicepListPage implements OnInit {

  selectedvalue: string = "";
  bicepTrainingList: Array<{ exerciseName: any }> = [];
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
    this.bicepTrainingList.push({ exerciseName: "Dumbell Curls" });
    this.bicepTrainingList.push({ exerciseName: "Barbell Curls" });
    this.bicepTrainingList.push({ exerciseName: "Preacher Curls" });
    this.bicepTrainingList.push({ exerciseName: "Hammer Curls" });
    this.bicepTrainingList.push({ exerciseName: "EZ-Bar Curls" });

    for (let i = 0; i < this.bicepTrainingList.length; i++) {
      var str = JSON.stringify(this.bicepTrainingList[i])
      console.log(this.bicepTrainingList[i])
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
    this.bicepTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.bicepTrainingList.length; i++) {
      console.log(this.bicepTrainingList[i])
    }
  }

  delete(number) { //number is the obj passed thorugh
    for (let i = 0; i < this.bicepTrainingList.length; i++) {
      if (typeof (number) != "undefined") {
        for (let i = 0; i < this.bicepTrainingList.length; i++) {
          if (this.bicepTrainingList[i] == number) {
            this.bicepTrainingList.splice(i, 1);
          }
        }
      }
    }
  }

}
