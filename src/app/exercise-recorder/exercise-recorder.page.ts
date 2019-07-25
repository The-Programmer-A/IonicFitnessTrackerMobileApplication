import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-recorder',
  templateUrl: './exercise-recorder.page.html',
  styleUrls: ['./exercise-recorder.page.scss'],
})
export class ExerciseRecorderPage implements OnInit {

  currentWeight = 0
  currentReps = 0
  xSets: number

  constructor() { }

  ngOnInit() {
  }

  private incrementWeight() {
    if(this.currentWeight > 0){
      this.currentWeight += 2.5;
    }else{
      //show an alert that it things are below 0
    }
    console.log("increamenting")
  }
  
  private decrementWeight() {
    if(this.currentWeight > 0){
      this.currentWeight += 2.5 ;
    }else{
      //show an alret that it cannot be below 0
    }
    console.log("decrementing")
  }

  private incrementReps(){
    if(this.currentReps > 0){
      this.currentReps++
    }else{
      //showAlert
    }
    console.log("incrementingReps")
  }

  private decrementReps(){
    if(this.currentReps >0){
      this.currentReps--;
    }else{
      //aleart
    }
    console.log("decrementing")
  }

  private submit(){
    this.xSets++;
  }



}
