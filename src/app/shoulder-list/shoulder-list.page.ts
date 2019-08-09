import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-shoulder-list',
  templateUrl: './shoulder-list.page.html',
  styleUrls: ['./shoulder-list.page.scss'],
})
export class ShoulderListPage implements OnInit {

  selectedvalue: string = "";
  shoulderTrainingList: Array<{ exerciseName: any }> = []; //read from the HTML to display list items. Add to this list to display new/more items in the HTML
  loggingExercise: string

  //newSet: Array<{ id: number, weight: number, reps: number }> = []



  constructor(
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    public alretController: AlertController
  ) {
  }


  ngOnInit() {
     //on entry add some basic list of exercises
    this.shoulderTrainingList.push({ exerciseName: "Arnold Press" });
    this.shoulderTrainingList.push({ exerciseName: "Over Head Press" });
    this.shoulderTrainingList.push({ exerciseName: "Side Lateral Raises" });
    this.shoulderTrainingList.push({ exerciseName: "Front Raises" });
    this.shoulderTrainingList.push({ exerciseName: "Cabel Face Pulls" });
    this.shoulderTrainingList.push({ exerciseName: "Dumbell Press" });

      // Testing Purpose
    // for (let i = 0; i < this.shoulderTrainingList.length; i++) {
    //   var str = JSON.stringify(this.shoulderTrainingList[i])
    //   console.log(this.shoulderTrainingList[i])
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
    this.shoulderTrainingList.push({ exerciseName: string });
    for (let i = 0; i < this.shoulderTrainingList.length; i++) {
      console.log(this.shoulderTrainingList[i])
    }
  }

  /**
  * Method used for the deletion of a selected card
  * @param number the number associated to which card the user selected. This allows use to delete the user selected card
  */
  delete(number) { //number is the obj passed thorugh
    for (let i = 0; i < this.shoulderTrainingList.length; i++) {
      if (typeof (number) != "undefined") {
        for (let i = 0; i < this.shoulderTrainingList.length; i++) {
          if (this.shoulderTrainingList[i] == number) {
            this.shoulderTrainingList.splice(i, 1);
          }
        }
      }
    }
  }
}
