import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tricep-list',
  templateUrl: './tricep-list.page.html',
  styleUrls: ['./tricep-list.page.scss'],
})
export class TricepListPage implements OnInit {

  selectedvalue: string = "";
  tricepTrainingList: Array<{ exerciseName: any }> = [];
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
    this.tricepTrainingList.push({ exerciseName: "Rope Pull Downs" });
    this.tricepTrainingList.push({ exerciseName: "French Press" });
    this.tricepTrainingList.push({ exerciseName: "Close Grip Beanch Press" });
    this.tricepTrainingList.push({ exerciseName: "V-Bar Pushdowns" });
    this.tricepTrainingList.push({ exerciseName: "EZ-Bar Skullcrushers" });


    for (let i = 0; i < this.tricepTrainingList.length; i++) {
      var str = JSON.stringify(this.tricepTrainingList[i])
      console.log(this.tricepTrainingList[i])
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
    this.tricepTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.tricepTrainingList.length; i++) {
      console.log(this.tricepTrainingList[i])
    }
  }

  delete(number) { //number is the obj passed thorugh
    for (let i = 0; i < this.tricepTrainingList.length; i++) {
      if (typeof (number) != "undefined") {
        for (let i = 0; i < this.tricepTrainingList.length; i++) {
          if (this.tricepTrainingList[i] == number) {
            this.tricepTrainingList.splice(i, 1);
          }
        }
      }
    }
  }


}
