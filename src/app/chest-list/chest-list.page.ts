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
  chestTrainingList: Array<{ exerciseName: any }> = []; //read from the HTML to display list items. Add to this list to display new/more items in the HTML
  loggingExercise: string

  //newSet: Array<{ id: number, weight: number, reps: number }> = [] don't think that i need this

  constructor(
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    public alretController: AlertController
  ) {
  }


  ngOnInit() {
    //on entry add some basic list of exercises.
    this.chestTrainingList.push({ exerciseName: "Dumbell Flat Bench" });
    this.chestTrainingList.push({ exerciseName: "Barbell Flat Bench" });
    this.chestTrainingList.push({ exerciseName: "Dumbell Incline Bench" });
    this.chestTrainingList.push({ exerciseName: "Barbell Incline Bench" });
    this.chestTrainingList.push({ exerciseName: "Dumbell Flys" });
    this.chestTrainingList.push({ exerciseName: "Machine Flys" });

    // Testing purpose
    // for (let i = 0; i < this.chestTrainingList.length; i++) {
    //   var str = JSON.stringify(this.chestTrainingList[i])
    //   console.log(this.chestTrainingList[i])
    // }
  }


  /**
     * This records which exercise the user selected and sends the exercise information and redirects to the exercise-recorder
     * @param number the card that is associsated with a workout name. This is used for data entry purposes
     */
  exerciseRecorder(number) {
    //console.log(number)

    this.loggingExercise = number.exerciseName;

    let inputData: NavigationExtras = {
      queryParams: {
        exercise: this.loggingExercise
      }
    }

    this.router.navigate(['/exercise-recorder'], inputData)
  }


  /**
 * Creates a pop up that the user displays information with regards to a new exercise. 
 */
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


  /**
 * helper method that is used to add the user input into the array allowing it to be displayed in the HTML
 * @param string the new exercise entered by the user.
 */
  addNewExercise(string) {
    this.chestTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.chestTrainingList.length; i++) {
      console.log(this.chestTrainingList[i])
    }
  }


  /**
  * Method used for the deletion of a selected card
  * @param number the number associated to which card the user selected. This allows use to delete the user selected card
  */
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
