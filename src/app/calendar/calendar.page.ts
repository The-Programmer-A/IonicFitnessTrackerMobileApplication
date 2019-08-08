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

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '', 
    reminder: false
  };

  minDate = new Date().toISOString();

  eventSource = []

  calendar = {
    mode: 'month', 
    date: new Date()
  };

  viewTitle = ""

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string) { }

  ngOnInit() {
    this.resetEvent();
  }


  resetEvent(){
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      reminder: false
    };
  }

  addEvent(){
    let eventCopy = {
      title: this.event.title, 
      startTime: new Date(this.event.startTime), 
      endTime: new Date(this.event.endTime),
      reminder: this.event.reminder, 
      desc: this.event.desc
    }

    //might need to add the functionaility of reminder here:


    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  changeMode(mode){
    this.calendar.mode = mode;
  }

  today(){
    this.calendar.date = new Date()
  }


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

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
}


