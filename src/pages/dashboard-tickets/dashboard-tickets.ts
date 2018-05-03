import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ConstantsProvider, TicketToShowStructure } from '../../providers/constants/constants'
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
 	selector: 'page-dashboard-tickets',
 	templateUrl: 'dashboard-tickets.html',
 })
 export class DashboardTicketsPage {

 	TIMER
 	timerSubscription

 	bundleData:{ticket_info:any}
 	bundleTicketDescription: any[] = [];
 	bundleTicketsToShow: Array<TicketToShowStructure> = []

 	currentTime = 0
 	arrayActivatedTickets = []

 	isListLoaded = false
 	expiryDate : { expiry_date:any }
 	requestBundle = {user_id: '', token: ''}
 	timerView = false

 	constructor( 	
 		public navCtrl: NavController, 
 		public navParams: NavParams,
 		public rest: RestProvider,
 		private storage: Storage,
 		private constantProvider: ConstantsProvider,
 		private alertCtrl: AlertController,
 		public loadingController: LoadingController,) {
 	}

	ionViewWillEnter(){
		this.checkForLogin()
	}

	ionViewDidLeave() {
		if ( this.timerSubscription ) {
			this.timerSubscription.unsubscribe();
		}
		
	}

	initialiseArrayActivatedTickets() {
		for (let ticket of this.bundleTicketsToShow) {
			if (ticket.is_active) {
				this.arrayActivatedTickets.push(ticket)
			}
		}

		this.activateTimerToUpdateValues()
	}

	activateTimerToUpdateValues() {
		this.TIMER = Observable.interval(1000)
		this.timerSubscription = this.TIMER.subscribe((x) => {           
			this.currentTime += 1

			for (let ticket of this.arrayActivatedTickets) {
				this.getTimerValues(ticket.expiry_date - this.currentTime, ticket);
			}
		});
	}

	checkForLogin() {
		this.storage.get('is_login').then((isLogin) => {
			if (!isLogin) {
				this.moveToLoginPage()
			}
			else {
				this.storage.get('user_data').then((user_data) => {
					this.requestBundle.user_id = JSON.parse(user_data).id;
					this.storage.get('auth_token').then((authToken) => {
						this.requestBundle.token = authToken;

						this.sendTicketsRequestToServer()  
					});
				});
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

					this.getTicketExpiryTime(ticket)
				}
			},
			{
				text: 'Dismiss'
			}
			]

		});

		alert.present();
	}

	getTicketExpiryTime(ticket) {
		let loader = this.loadingController.create({
			content: "Sending ..."
		});

		let requestBundle = {
			user_id:this.requestBundle.user_id,
			token: this.requestBundle.token,
			ticket_id: ticket.ticket_id
		}

		this.rest.getExpiryTime(requestBundle)
		.subscribe(
			responseData => this.expiryDate = <{expiry_date : any}> responseData,
			err => loader.dismiss(),
			() => {
				let expDate = <any> this.expiryDate.expiry_date;
				this.timerView = true
				ticket.is_active = 1;
				ticket.expiry_date = expDate 
				this.arrayActivatedTickets.push(ticket)
			})
	}

	getTimerValues(time,ticket) {
		var days, hours, minutes, seconds;
		days = Math.floor(time / 86400);
		time -= days * 86400;
		hours = Math.floor(time / 3600) % 24;
		time -= hours * 3600;
		minutes = Math.floor(time / 60) % 60;
		time -= minutes * 60;
		seconds = time % 60;

		if(days < 0){
			ticket.timer_value = "Ticket Expired"
		}
		else{
			ticket.timer_value = "<b>"+days+"</b> Days <b>"+hours+"</b> Hours <b>"+minutes+"</b> Minutes <b>"+
			seconds+"</b> Seconds left"
		}
	}

	buttonProfilePressed(ticket) {
		this.navCtrl.push(TicketDetailsPage,{'ticket': JSON.stringify(ticket)})
	}


	convertUnixTimestampToDate(timestamp) {
		return new Date(timestamp*1000).toUTCString()
	}

	sendTicketsRequestToServer() {
		let loader = this.loadingController.create({
			content: "Sending ..."
		});

		this.rest.getTicketsForDashboard(this.requestBundle)
		.subscribe(
			responseData => this.bundleData = <{ticket_info : any}> responseData,
			err => loader.dismiss(),
			() => {
				this.bundleTicketDescription = <any[]> this.bundleData.ticket_info;
				this.bundleTicketsToShow = []
				this.currentTime = 0

				for (let ticket of this.bundleTicketDescription) {   
					if(ticket.ticket_type == 1) {
						ticket.ticket_type = 'Adult'
					}
					if(ticket.ticket_type == 2) {
						ticket.ticket_type = 'Child'
					}
					if(ticket.ticket_type == 3) {
						ticket.ticket_type = 'Family'
					}

					this.bundleTicketsToShow.push(<TicketToShowStructure> {
						ticket_id:ticket.ticket_id,
						first_name:ticket.first_name, 
						last_name:ticket.last_name,
						ticket_type:ticket.ticket_type,
						is_active:ticket.is_active,
						is_complete:ticket.is_complete,
						travel_pass_code :ticket.travel_pass_code,
						expiry_date:ticket.expiry_date,
						timer_value:'', 
						current_date:ticket.current_date,
						is_open:true
					})
				}
				if(this.bundleTicketsToShow.length > 0) {
				this.isListLoaded = true	
				this.currentTime = this.bundleTicketsToShow[0].current_date
				}
				this.initialiseArrayActivatedTickets()
			}
			);
	}

	buttonBackPressed() {
		this.navCtrl.pop();
	}

	presentAlert(title,message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['Okay']
		});
		alert.present();
	}

	toggleSection(ticket) {
		ticket.is_open = !ticket.is_open
	}


}
