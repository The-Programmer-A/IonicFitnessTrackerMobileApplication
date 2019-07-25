import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-back-list',
  templateUrl: './back-list.page.html',
  styleUrls: ['./back-list.page.scss'],
})
export class BackListPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  exerciseRecorder(){
    console.log("something is happneing")
    this.router.navigate(['/exercise-recorder'])
  }

}
