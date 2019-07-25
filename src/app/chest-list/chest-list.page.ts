import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chest-list',
  templateUrl: './chest-list.page.html',
  styleUrls: ['./chest-list.page.scss'],
})
export class ChestListPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  exerciseRecorder(){
    console.log("something is happneing")
    this.router.navigate(['/exercise-recorder'])
  }

}
