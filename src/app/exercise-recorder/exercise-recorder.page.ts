import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
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

  selectedPath = ''

  constructor(
    public alert: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    private menu: MenuController,
    private datePipe: DatePipe
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('params: ', params);
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

  storeRecorded(number) {
    const exercise = this.currentExercise
    const workoutDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')
    const arrOfWorkout = this.newSet

    this.afstore.doc(`users/${this.user.getUID}`).update({
      exerciseRecord: firestore.FieldValue.arrayUnion({
        exercise,
        workoutDate,
        arrOfWorkout
      })
    });
  }


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

  private decrementWeight() {
    if (this.currentWeight > 0) {
      this.currentWeight -= 2.5;
      console.log(this.currentWeight)
    } else {
      this.showAlert("Opps", "Sorry, weights cannot be below 0")
    }
    console.log("decrementing")
  }

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

  private decrementReps() {
    if (this.currentReps > 0) {
      this.currentReps--;
      console.log(this.currentReps)
    } else {
      this.showAlert("Opps", "Sorry, reps cannot be below 0")
    }
    console.log("decrementing")
  }

  private submit() {
    console.log("currentWeight: " + this.currentWeight)
    console.log("CurrentReps: " + this.currentReps)
    this.newSet.push({ id: this.xSets, weight: this.currentWeight, reps: this.currentReps })
    this.xSets++;
  }

  private selectCard(number) {
    console.log(number)
    this.deletingCard = number
  }

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

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })

    await alert.present()
  }


}
