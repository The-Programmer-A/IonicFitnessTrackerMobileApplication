import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-legs-list',
  templateUrl: './legs-list.page.html',
  styleUrls: ['./legs-list.page.scss'],
})
export class LegsListPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  exerciseRecorder(){
    console.log("something is happneing")
    this.router.navigate(['/exercise-recorder'])
  }

}
