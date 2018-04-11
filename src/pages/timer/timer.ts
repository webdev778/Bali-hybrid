import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ConstantsProvider } from '../../providers/constants/constants'

@IonicPage()
@Component({
     selector: 'page-timer',
     templateUrl: 'timer.html',
})

 export class TimerPage {

    // private eventDate: Date = new Date("April 12, 2018 10:12:20")
     private diff: number;
     
     isValid = true

     timerData = {days:'',hours:'',minutes:'',seconds:''}

     constructor(public navCtrl: NavController, private constantProvider: ConstantsProvider) {
         this.constantProvider.eventDate = new Date("April 11, 2018 20:12:20")

         Observable.interval(1000).map((x) => {
             this.diff = Math.floor((this.constantProvider.eventDate.getTime() - new Date().getTime()) / 1000);
         }).subscribe((x) => {           
             this.getTimerValues(this.diff);

         });
     }

     getTimerValues(time){
         if(days < 0){
             this.isValid = false
         }
         var days, hours, minutes, seconds;
         days = Math.floor(time / 86400);
         time -= days * 86400;
         hours = Math.floor(time / 3600) % 24;
         time -= hours * 3600;
         minutes = Math.floor(time / 60) % 60;
         time -= minutes * 60;
         seconds = time % 60;

         if(days < 0){
             this.isValid = false
         }

         this.timerData = {days: days, hours: hours, minutes: minutes, seconds: seconds}

     }

 }

