import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-muscle-group',
  templateUrl: './select-muscle-group.page.html',
  styleUrls: ['./select-muscle-group.page.scss'],
})
export class SelectMuscleGroupPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  backList(){
    console.log("back")
    this.router.navigate(['/back-list'])
  }

  chestList(){
    console.log("chest")
    this.router.navigate(['/chest-list'])
  }

  shouldersList(){
    console.log("shoulders")
    this.router.navigate(['/shoulder-list'])
  }

  tricepsList(){
    console.log("triceps")
    this.router.navigate(['/trcep-list'])
  }

  bicepsList(){
    console.log("biceps")
    this.router.navigate(['/bicep-list'])
  }

  coreList(){
    console.log("core")
    this.router.navigate(['/core-list'])
  }

  legsList(){
    console.log("legs")
    this.router.navigate(['/legs-list'])
  }

  cardioList(){
    console.log("cardio")
    this.router.navigate(['/cardio-list'])
  }

  goBack(){
    //route to the previous page
    this.router.navigate(['/tabs'])
  }




}
