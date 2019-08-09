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
  backTrainingList: Array<{ exerciseName: any }> = []; //read from the HTML to display list items. Add to this list to display new/more items in the HTML
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
    this.backTrainingList.push({ exerciseName: "Barbell Rows" });
    this.backTrainingList.push({ exerciseName: "Dumbell Rows" });
    this.backTrainingList.push({ exerciseName: "Deadlifts" });
    this.backTrainingList.push({ exerciseName: "Lat Pulldowns" });
    this.backTrainingList.push({ exerciseName: "Lat Machine Rows" });
    this.backTrainingList.push({ exerciseName: "Pull Ups" });

    //testing purpose to make sure that everything is the way it should be
    // for (let i = 0; i < this.backTrainingList.length; i++) {
    //   var str = JSON.stringify(this.backTrainingList[i])
    //   console.log(this.backTrainingList[i])
    // }
  }

  /**
   * This records which exercise the user selected and sends the exercise information and redirects to the exercise-recorder
   * @param number the card that is associsated with a workout name. This is used for data entry purposes
   */
  exerciseRecorder(number) {
    //console.log(number) testing purpose

    //used to send information to the exercise recorder
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
    this.addNewExercise(newex); //uses helper method to add the new entry into the array which displays it in the HTML
  }


  /**
   * helper method that is used to add the user input into the array allowing it to be displayed in the HTML
   * @param string the new exercise entered by the user.
   */
  addNewExercise(string) {
    this.backTrainingList.push({ exerciseName: string });
    //testing purpose
    // for (let i = 0; i < this.backTrainingList.length; i++) {
    //   console.log(this.backTrainingList[i])
    // }
  }

  /**
   * Method used for the deletion of a selected card
   * @param number the number associated to which card the user selected. This allows use to delete the user selected card
   */
  delete(number) { //number is the obj passed thorugh 
    console.log("something ")
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
