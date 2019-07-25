import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bicep-list',
  templateUrl: './bicep-list.page.html',
  styleUrls: ['./bicep-list.page.scss'],
})
export class BicepListPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  exerciseRecorder(){
    console.log("something is happneing")
    this.router.navigate(['/exercise-recorder'])
  }

}
