import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelectMuscleGroupPage } from './select-muscle-group.page';

const routes: Routes = [
  {
    path: '',
    component: SelectMuscleGroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelectMuscleGroupPage]
})
export class SelectMuscleGroupPageModule {}
