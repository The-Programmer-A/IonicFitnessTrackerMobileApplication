import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

 
@Component({
  selector: 'app-exercise-recorder',
  templateUrl: './exercise-recorder.page.html',
  styleUrls: ['./exercise-recorder.page.scss'],
})
export class ExerciseRecorderPage implements OnInit {

  data: any 
  currentWeight
  currentReps
  xSets = 0
  deletingCard: any
  newSet: Array<{ id: number, weight: number, reps: number }> = []

  constructor(
    public alert: AlertController,
    private route: ActivatedRoute, 
    private router: Router 
    ) { 
      this.route.queryParams.subscribe(params => {
        // console.log('params: ', params);
        if(params && params.exercise){
          this.data = params.exercise
        }
      })
    }

  ngOnInit() {
    
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
