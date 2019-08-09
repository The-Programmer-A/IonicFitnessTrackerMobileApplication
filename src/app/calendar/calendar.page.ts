import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar'
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({ 
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  // this array holds the information that is used by the new workout event.
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '', 
    reminder: false
  };
  minDate = new Date().toISOString(); 
  eventSource = []

  //calendar object that holds the information of the calendar
  calendar = {
    mode: 'month', 
    date: new Date()
  };

  viewTitle = "" //allows for dynamic chainging of title
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string) { }

  ngOnInit() {
    this.resetEvent(); //everytime we enter this page we want it to rest
  }

  /**
   * this method is used as a dynamic updater of the calendar page/view
   */
  resetEvent(){
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      reminder: false
    };
  }

  /**
   * this creates a copy of the updated event to allow for the addition of this infomration into the calendar view.
   * 
   */
  addEvent(){
    let eventCopy = {
      title: this.event.title, 
      startTime: new Date(this.event.startTime), 
      endTime: new Date(this.event.endTime),
      reminder: this.event.reminder, 
      desc: this.event.desc
    }
    //might need to add the functionaility of reminder here:\
    
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  /**
   * changes the view of the calendar based on the user inputs
   * @param mode the selected mode
   */
  changeMode(mode){
    this.calendar.mode = mode;
  }

  /**
   * functionality of the 'Today' button. Allows the user to be brought back to the current date.
   */
  today(){
    this.calendar.date = new Date()
  }

  /**
   * This function allows for the detailed view of a created event.
   * @param event the event that was selected on the calendar view
   */
  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title, 
      subHeader: event.desc, 
      message: 'From: ' + start + '<br><br>To: ' + end, 
      buttons: ['OK']
    })
    alert.present();
  }

  /**
   * this updates the header of the calendar to display the date
   * @param title the date that is going to be formatted in the header
   */
  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  /**
   * functionality of the time picker that is used in the new workout plan card.
   * @param ev the given time
   */
  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
}


