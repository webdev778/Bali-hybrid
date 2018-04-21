import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ConstantsProvider } from '../../providers/constants/constants'
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { TicketDetailsPage} from '../ticket-details/ticket-details';


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

	dashboardData :Array <{userId: number,userName:string,ticketType:string,
		isActive:number,isExpired:number,profileStatus:number,expiryDate:number,timerValue:string}>= []

	currentTime = Math.floor(new Date().getTime() / 1000)
	arrayActivatedTickets = []

	constructor( 	public navCtrl: NavController, 
					public navParams: NavParams,
					public rest: RestProvider,
					private storage: Storage,
					private constantProvider: ConstantsProvider,
					private alertCtrl: AlertController,) {

		this.checkForLogin()
		this.getTicketDataFromServer()
	}

	getTicketDataFromServer() {
		this.dashboardData = [
			{	
				userId: 1,
				userName:'John Dean',
				ticketType:'Adult',
				isActive:0,
				isExpired:0,
				profileStatus:1, 
				expiryDate: Math.floor(new Date('April 30, 2018 19:52:20').getTime() / 1000),
				timerValue: ''
			},

			{	
				userId: 2,
				userName:'Tom MacMohan',
				ticketType:'Adult',
				isActive:0,
				isExpired:0,
				profileStatus:1, 
				expiryDate: Math.floor(new Date('April 30, 2018 19:52:20').getTime() / 1000),
				timerValue: ''
			},

			{	userId: 3,
				userName:'Dwyane Bravo',
				ticketType:'Adult',
				isActive:0,
				isExpired:0,
				profileStatus:0, 
				expiryDate: Math.floor(new Date('May 20, 2018 19:52:20').getTime() / 1000),
				timerValue: ''
			},

			{	userId: 4,
				userName:'Tamara',
				ticketType:'Child',
				isActive:0,
				isExpired:0,
				profileStatus:1, 
				expiryDate: Math.floor(new Date('May 02, 2018 19:52:20').getTime() / 1000),
				timerValue: ''
			},

		]
	
		this.initialiseArrayActivatedTickets()
	}

	initialiseArrayActivatedTickets() {
		for (let ticket of this.dashboardData)
		{
			if (ticket.isActive)
			{
				this.arrayActivatedTickets.push(ticket)
			}
		}

		this.activateTimerToUpdateValues()
	}

	activateTimerToUpdateValues() {
		Observable.interval(1000).subscribe((x) => {           
			this.currentTime += 1

			for (let ticket of this.arrayActivatedTickets)
			{
				this.getTimerValues(ticket.expiryDate - this.currentTime, ticket);
			}
         });
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

	
	activateTimer(ticket) {

		this.presentAlertConfirmActivation(ticket)
		
	}


	presentAlertConfirmActivation(ticket) {
		let alert = this.alertCtrl.create({
			title: 'Confirm Ticket Activation',

			subTitle: 'Are you sure to activate your your ticket?',
			buttons: [
						{
							text : 'Yes, I\'m sure',
							handler: () => {
								ticket.isActive = 1;
								this.arrayActivatedTickets.push(ticket)
							}
						},
						{
							text: 'Dismiss'
						}
					  ]

		});
		alert.present();
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
             ticket.timerValue = "Ticket Expired"
         }
         else{
         	ticket.timerValue = "<b>"+days+"</b> Days <b>"+hours+"</b> Hours <b>"+minutes+"</b> Minutes <b>"+
         						seconds+"</b> Seconds"
         }

    }

     buttonProfileressed(){
     	this.navCtrl.push(TicketDetailsPage)
     }


    convertUnixTimestampToDate(timestamp){
    	return new Date(timestamp*1000).toUTCString()
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
