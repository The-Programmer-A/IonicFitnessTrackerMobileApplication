import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExerciseRecorderPage } from './exercise-recorder.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciseRecorderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExerciseRecorderPage]
})
export class ExerciseRecorderPageModule {}
