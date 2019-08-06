import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-chest-list',
  templateUrl: './chest-list.page.html',
  styleUrls: ['./chest-list.page.scss'],
})
export class ChestListPage implements OnInit {

  selectedvalue: string = "";
  chestTrainingList: Array<{ exerciseName: any }> = [];
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
    this.chestTrainingList.push({ exerciseName: "Dumbell Flat Bench" });
    this.chestTrainingList.push({ exerciseName: "Barbell Flat Bench" });
    this.chestTrainingList.push({ exerciseName: "Dumbell Incline Bench" });
    this.chestTrainingList.push({ exerciseName: "Barbell Incline Bench" });
    this.chestTrainingList.push({ exerciseName: "Dumbell Flys" });
    this.chestTrainingList.push({ exerciseName: "Machine Flys" });


    for (let i = 0; i < this.chestTrainingList.length; i++) {
      var str = JSON.stringify(this.chestTrainingList[i])
      console.log(this.chestTrainingList[i])
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

  addNewExercise(string) {
    this.chestTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.chestTrainingList.length; i++) {
      console.log(this.chestTrainingList[i])
    }
  }

  delete(number) { //number is the obj passed thorugh
    for (let i = 0; i < this.chestTrainingList.length; i++) {
      if (typeof (number) != "undefined") {
        for (let i = 0; i < this.chestTrainingList.length; i++) {
          if (this.chestTrainingList[i] == number) {
            this.chestTrainingList.splice(i, 1);
          }
        }
      }
    }
  }
 
}
