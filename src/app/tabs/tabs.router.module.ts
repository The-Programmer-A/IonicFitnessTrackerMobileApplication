import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '', //default path
		component: TabsPage, //spesifies which componenet of the tabs we want the path to point to 
		children: [ //these are the components options
            { path: 'calendar', loadChildren: '../calendar/calendar.module#CalendarPageModule' },
            { path: 'new-record', loadChildren: '../new-record/new-record.module#NewRecordPageModule' }
		]
	}	
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class TabsRoutingModule { }
  