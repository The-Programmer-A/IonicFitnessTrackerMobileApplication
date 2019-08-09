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
  bicepTrainingList: Array<{ exerciseName: any }> = []; //read from the HTML to display list items. Add to this list to display new/more items in the HTML
  loggingExercise: string //this is used for data transfer to exercise-recorder page

  //newSet: Array<{ id: number, weight: number, reps: number }> = [] don't think that this is used

  constructor(
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    public alretController: AlertController
  ) {
  }


  ngOnInit() {
    //on entry add some basic list of exercises.
    this.bicepTrainingList.push({ exerciseName: "Dumbell Curls" });
    this.bicepTrainingList.push({ exerciseName: "Barbell Curls" });
    this.bicepTrainingList.push({ exerciseName: "Preacher Curls" });
    this.bicepTrainingList.push({ exerciseName: "Hammer Curls" });
    this.bicepTrainingList.push({ exerciseName: "EZ-Bar Curls" });
    
    // Testing purposes
    // for (let i = 0; i < this.bicepTrainingList.length; i++) {
    //   var str = JSON.stringify(this.bicepTrainingList[i])
    //   console.log(this.bicepTrainingList[i])
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
    this.bicepTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.bicepTrainingList.length; i++) {
      console.log(this.bicepTrainingList[i])
    }
  }

   /**
   * Method used for the deletion of a selected card
   * @param number the number associated to which card the user selected. This allows use to delete the user selected card
   */
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
