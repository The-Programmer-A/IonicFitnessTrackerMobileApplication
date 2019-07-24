import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'select-muscle-group', loadChildren: './select-muscle-group/select-muscle-group.module#SelectMuscleGroupPageModule' },
  { path: 'back-list', loadChildren: './back-list/back-list.module#BackListPageModule' },
  { path: 'chest-list', loadChildren: './chest-list/chest-list.module#ChestListPageModule' },
  { path: 'shoulder-list', loadChildren: './shoulder-list/shoulder-list.module#ShoulderListPageModule' },
  { path: 'tricep-list', loadChildren: './tricep-list/tricep-list.module#TricepListPageModule' },
  { path: 'bicep-list', loadChildren: './bicep-list/bicep-list.module#BicepListPageModule' },
  { path: 'core-list', loadChildren: './core-list/core-list.module#CoreListPageModule' },
  { path: 'legs-list', loadChildren: './legs-list/legs-list.module#LegsListPageModule' },
  { path: 'cardio-list', loadChildren: './cardio-list/cardio-list.module#CardioListPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
