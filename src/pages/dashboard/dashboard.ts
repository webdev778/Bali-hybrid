import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { ConstantsProvider } from '../../providers/constants/constants'
import { Storage } from '@ionic/storage';
import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-dashboard',
	templateUrl: 'dashboard.html',
})
export class DashboardPage {

	dashboardData :Array <{ticketId: number,ticketType:string,isActive:number,isExpired:number,profileStatus:number,expiryDate:Date,timerValue:string}>= [

							{ticketId: 0,ticketType:'Adult',isActive:0,isExpired:0,profileStatus:1, expiryDate:new Date('April 12, 2018 11:52:20') ,timerValue: ''},
							{ticketId: 1,ticketType:'Child',isActive:0,isExpired:0,profileStatus:1, expiryDate:new Date('April 13, 2018 20:12:20') ,timerValue: ''},
							{ticketId: 2,ticketType:'Family',isActive:0,isExpired:0,profileStatus:1, expiryDate:new Date('April 14, 2018 20:12:20') ,timerValue: ''},
							{ticketId: 3,ticketType:'Child',isActive:0,isExpired:0,profileStatus:1, expiryDate:new Date('April 15, 2018 20:12:20') ,timerValue: ''}
							
													
						]
	isValid = true
	currentTime = new Date().getTime()
	timerData = {days:'',hours:'',minutes:'',seconds:''}

	constructor(  public navCtrl: NavController, 
								public navParams: NavParams,
								public rest: RestProvider,
								private storage: Storage,
								private constantProvider: ConstantsProvider) {

		//this.checkForLogin()

		
	}

	checkForLogin() {
		this.storage.get('is_login').then((isLogin) => {
			 if (!isLogin) {
					 this.moveToLoginPage()
			 }
		 })
	}


	moveToLoginPage() {
		this.storage.remove('user_data');
		this.storage.remove('auth_token');
		this.storage.set('is_login', false);

		this.constantProvider.loginTitle = 'LOGIN';
		this.constantProvider.loginPage = 'LoginPage'

		this.navCtrl.setRoot('LoginPage')
	}

	buttonLogoutPressed() {
			this.moveToLoginPage()
	}


	 private diff: number;

	
	activateTimer(ticket){
		ticket.isActive = 1;
 		
 		Observable.interval(1000).map((x) => {
             this.diff = Math.floor((ticket.expiryDate.getTime() - new Date().getTime()) / 1000);
         }).subscribe((x) => {           
             this.getTimerValues(this.diff,ticket);

         });
	}

	getTimerValues(time,ticket){
   
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
             ticket.timerValue = "Ticket Expired"
         }
         else{
         ticket.timerValue = days+'Days'+' '+hours+'Hours'+' '+ minutes+'Minutes'+ ' '+ seconds + 'Seconds'
         }

     }

     updatedashboard() {

			this.dashboardData['user_id'] = 1

			this.rest.updateUserDashboard(this.dashboardData)
				 .subscribe(
						 userData => console.log(userData),
						 err => console.log(err),
						 () => {
							 
							 
						 }
					 );
	}


}
