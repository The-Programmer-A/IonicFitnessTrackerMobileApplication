import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { ActivatedRoute, Router, RouterEvent, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-exercise-recorder',
  templateUrl: './exercise-recorder.page.html',
  styleUrls: ['./exercise-recorder.page.scss'],
})
export class ExerciseRecorderPage implements OnInit {
  date = new Date();
  currentExercise: any 
  currentWeight 
  currentReps 
  xSets = 0 
  deletingCard: any

  newSet: Array<{ id: number, weight: number, reps: number }> = []

  id: number
  weight: number 
  reps: number

  /**the pages array is used by the menu button in order to display menu titles and navigate to selected pages */
  pages = [
    {
      title: 'Home',
      url: '/tabs/new-record'
    },
    {
      title: 'All Exercises',
      url: '/select-muscle-group'
    }
  ];

  selectedPath = '' //track the selected path

  constructor(
    public alert: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    private menu: MenuController,
    private datePipe: DatePipe
  ) {
    // this gets information about the type of exercise selected. This is required for data storeage
    this.route.queryParams.subscribe(params => {
      //console.log('params: ', params);
      if (params && params.exercise) {
        this.currentExercise = params.exercise
      }
    });
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url
    });
  }

  ngOnInit() {
  }

  /**
   * this method stores the information gained from pervioud pages and entered in this page into the databse,
   * this information is used later i different sections of the application
   */
  storeRecorded() {
    const exercise = this.currentExercise
    const workoutDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')

    const iden= this.id
    const w = this.weight
    const r = this.reps

    this.afstore.doc(`users/${this.user.getUID}`).update({
      exerciseRecord: firestore.FieldValue.arrayUnion({
        exercise,
        workoutDate,
        iden, 
        w,
        r
      })
    });
  }

  /**
   * method that increments the weight by button click or input
   */
  private incrementWeight() {
    if (typeof (this.currentWeight) === "undefined") {
      this.currentWeight = 0;
      this.currentWeight += 2.5;
      console.log(this.currentWeight)
      return
    }

    if (this.currentWeight >= 0) {
      this.currentWeight += 2.5;
      console.log(this.currentWeight)
    } else {
      this.showAlert("Opps", "Sorry, weights cannot be below 0")
    }
    console.log("increamenting")
  }

    /**
   * method that decrement the weight by button click or input
   */
  private decrementWeight() {
    if (this.currentWeight > 0) {
      this.currentWeight -= 2.5;
      console.log(this.currentWeight)
    } else {
      this.showAlert("Opps", "Sorry, weights cannot be below 0")
    }
    console.log("decrementing")
  }

  /**
   * method that increments the reps by button click or input
   */
  private incrementReps() {
    if (typeof (this.currentReps) === "undefined") {
      this.currentReps = 0;
      this.currentReps++
      console.log(this.currentReps)
      return
    }

    if (this.currentReps > 0) {
      this.currentReps++
      console.log(this.currentReps)
    } else {
      this.showAlert("Opps", "Sorry, reps cannot be below 0")
    }
    console.log("incrementingReps")
  }

  /**
   * method that decrements the reps by button click or input
   */
  private decrementReps() {
    if (this.currentReps > 0) {
      this.currentReps--;
      console.log(this.currentReps)
    } else {
      this.showAlert("Opps", "Sorry, reps cannot be below 0")
    }
    console.log("decrementing")
  }

  /**
   * this handels the functionality of the save button. Stores the entered information which allows for
   * its storeage in the database
   */
  private submit() {
    //console.log("currentWeight: " + this.currentWeight)
    //console.log("CurrentReps: " + this.currentReps)

    this.newSet.push({ id: this.xSets, weight: this.currentWeight, reps: this.currentReps })

    this.id = this.xSets
    this.weight = this.currentWeight
    this.reps = this.currentReps

    this.xSets++;

    this.storeRecorded()
  }

  /**
   * this is used as a helper method to the delete function
   * @param number the card that the usser clicked on
   */
  private selectCard(number) {
    console.log(number)
    this.deletingCard = number
  }

  /**
   * deletes a selected card after the card is selected and delete button has be pressed.
   */
  private delete() {
    console.log("called");
    if (typeof (this.deletingCard) != "undefined") {
      for (let i = 0; i < this.newSet.length; i++) {
        if (this.newSet[i] == this.deletingCard) {
          this.newSet.splice(i, 1);
          this.xSets--;
        }
      }
    }
  }

  /**
   * helper method that sending information of the date to a selected path. this determins spesifc information that
   * is shown to the users dependant on the value of this transfered data.
   */
  sendInfo(){
    console.log(this.selectedPath)

    let dateChecker = this.date;
    let inputData: NavigationExtras = {
      queryParams: {
        date: dateChecker
      }
    }

    this.router.navigate([this.selectedPath], inputData);

  }

  /**
   * pop up alert that shows up when uses are entering invalid inputs
   * @param header the header message of the pop up alert
   * @param message the message of the pop up alert
   */
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })

    await alert.present()
  }

}
