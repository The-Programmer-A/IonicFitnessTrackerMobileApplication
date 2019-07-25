import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shoulder-list',
  templateUrl: './shoulder-list.page.html',
  styleUrls: ['./shoulder-list.page.scss'],
})
export class ShoulderListPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  exerciseRecorder(){
    console.log("something is happneing")
    this.router.navigate(['/exercise-recorder'])
  }

}
