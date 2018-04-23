import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { TicketStructure, TravellersInfoDS } from '../../providers/constants/constants';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';


@IonicPage()
@Component({
	selector: 'page-buy-travel-pass',
	templateUrl: 'buy-travel-pass.html',
})


export class BuyTravelPassPage {

	paymentView = false
	ticketsSaved = true
	confirmTicket = true
	travellerInfoWindow = true
	travellerFormSubmitted = false
	paymentFormSubmitted = false		

	cardType = ''
	finalCost = 0
	orderId = 0

	bundleTicketsForServer : Array<TicketStructure> = []
	bundleSaveTickets : Array<TicketStructure> = []
	bundleViewDescription : any[] = [];
	bundleData : {data : any};
	cardDetails = { number: '',exp_month:'' ,exp_year: '',cvc: ''}
	arrayTravellers : Array<TravellersInfoDS> = []
	bundlePaymentData = {name:'', phone:'', address:''}
	
	constructor(	public navCtrl: NavController, 
		public navParams: NavParams,
		private alertCtrl: AlertController,
		public rest: RestProvider,
		public loadingController: LoadingController,
		private storage: Storage,) {
	}

	ionViewDidLoad() {
		this.getTravelPassData()
	}

	incrementValue(ticket) {
		ticket.quantity++
	}

	decrementValue(ticket) {
		if (ticket.quantity <= 0) {
			ticket.quantity = 0;
		}else{
			ticket.quantity--
		}
	}

	getTotalCost() {
		this.finalCost = 0

		for (let ticket of this.bundleSaveTickets) {
			this.finalCost = this.finalCost + ticket.price
		} 		
	}

	initialiseBundle() {
		for (var count = 0 ; count < this.bundleSaveTickets.length; count++) {
			this.bundleSaveTickets[count].ticket_id = this.bundleViewDescription[count].id
			this.bundleSaveTickets[count].quantity = this.bundleViewDescription[count].quantity
			this.bundleSaveTickets[count].price = this.bundleViewDescription[count].quantity * 
			this.bundleViewDescription[count].price
			this.bundleSaveTickets[count].ticket_details = []
		}
		
		this.getTotalCost()
	}

	savePressed() {
		this.checkForLogin()
	}

	editPressed() {
		this.paymentView = false
		this.ticketsSaved = true
		this.travellerFormSubmitted = false
		this.travellerInfoWindow = true
	}

	continuePressed() {
		console.log("travellerformsubmitted " + this.travellerFormSubmitted )
		console.log(this.bundleSaveTickets)
		this.paymentView = true
		this.travellerInfoWindow = true
		console.log("travellerInfoWindow " +this.travellerInfoWindow)
		let adultTicket = this.bundleSaveTickets[ this.bundleSaveTickets.findIndex(obj=> obj.ticket_id === 1) ]
		if( adultTicket.quantity == 0 ) {
			this.sendTicketDetailsToServer()
		}
		else {
			this.initialiseArrayTraveller()
		}	
	}

	checkForLogin() {
		this.storage.get('is_login').then((isLogin) => {
			if (!isLogin) {
				this.presentAlertNotLoggedIn()
			}
			else{

				for (let ticket of this.bundleViewDescription) {
					if (ticket.quantity > 0) {

						this.ticketsSaved = false
						this.initialiseBundle()
						return
					}
				}

				this.ticketsSaved = true
				this.presentAlertNoTickets()
				
			}
		})
	}

	initialiseArrayTraveller() {
		this.arrayTravellers = []
		let adultIndex = 0

		let adultTicket = this.bundleSaveTickets[ this.bundleSaveTickets.findIndex(obj=> obj.ticket_id === 1) ]

		for(var count =1 ; count <= adultTicket.quantity ; count ++){
			this.arrayTravellers.push(<TravellersInfoDS> {  first_name:'', 
				last_name:'', 
				gender:'', 
				email:'', 
				ticket_type: this.bundleSaveTickets[
				adultIndex
				].ticket_type,
			})
			this.travellerInfoWindow = false
		}
	}	

	moveToLoginPage() {
		this.navCtrl.setRoot('LoginPage')
	}

	resetValues() {
		for (let ticket of this.bundleSaveTickets) 
		{
			ticket = <TicketStructure> {}
		}

		this.finalCost = 0
	}

	presentAlertNoTickets() {
		let alert = this.alertCtrl.create({
			subTitle: 'Please select a ticket to continue',
			buttons: ['Okay']
		});
		alert.present();
	}

	presentAlertNotLoggedIn() {
		let alert = this.alertCtrl.create({
			title: 'Not Logged In',

			subTitle: 'Please login to purchase travel pass',
			buttons: [
			{
				text : 'Login',
				handler: () => {
					this.moveToLoginPage()
				}
			}
			]

		});
		alert.present()
	}

	getTravelPassData() {
		this.rest.getTravelPass()
		.subscribe(
			responseData => this.bundleData = <{data : any}> responseData,
			err => console.log(err),
			() => {
				this.bundleViewDescription = <any[]> this.bundleData.data;
				for (let ticket of this.bundleViewDescription)
				{
					ticket['quantity'] = 0
					
					this.bundleSaveTickets.push(<TicketStructure> {ticket_type: ticket.title})
				}

			}
			);
	}

	buttonSubmitPressed(form: NgForm) {
		console.log("in buttonSubmitted")
		this.travellerFormSubmitted = true
		console.log(form.valid)
		if(form.valid){
			this.travellerInfoWindow = true
			console.log(this.arrayTravellers)
			this.addAdultInformation()
			this.sendTicketDetailsToServer()
		}
	}

	addAdultInformation() {
		let adultTicket = this.bundleSaveTickets[ this.bundleSaveTickets.findIndex(obj=> obj.ticket_id === 1) ]
		adultTicket.ticket_details = this.arrayTravellers
	}

	makePayment(form: NgForm) {
		console.log( "payment details button ")
		this.paymentFormSubmitted = true
		console.log(form.valid)
		if(form.valid){
			this.sendPaymentDetailsToServer()
		}
	}

	sendTicketDetailsToServer() {
		let loader = this.loadingController.create({
			content: "Sending ..."
		});

		this.createTicketBundleForServer()

		loader.present()

		let passInfo = {
			user_id:'1',
			token: '12345',
			ticket_bundle: this.bundleTicketsForServer, 
			total_cost: this.finalCost 
		}

		console.log(passInfo)

		this.rest.purchaseTravelPass(passInfo)
		.subscribe(
			responseData => this.checkTicketStatus(responseData),
			err => loader.dismiss(),
			() => {
				loader.dismiss()
			}
			);
	}

	createTicketBundleForServer() {
		for( let ticket of this.bundleSaveTickets) {
			if( ticket.quantity > 0 ) {
				this.bundleTicketsForServer.push(ticket)
			}
		}
	}



	checkTicketStatus(bundle) {
		if (bundle.status == 200) {
			this.orderId = bundle.order_id
			this.presentAlert('Success', bundle.order_id)
		}else {
			this.presentAlert('Error', bundle.api_message)
		}

	}

	sendPaymentDetailsToServer(){
		let loader = this.loadingController.create({
			content: "Sending ..."
		});

		loader.present();


		let paymentInfo = {
			user_id:'1',
			order_id: this.orderId,
			token: '12345',
			billing_info: this.bundlePaymentData, 
			card_details: this.cardDetails 
		}

		console.log(paymentInfo.order_id)

		console.log("Payment-Info :" + paymentInfo)

		this.rest.makeTravelPassPayment(paymentInfo)
		.subscribe(
			responseData => this.checkPaymentStatus(responseData),
			err => loader.dismiss(),
			() => {
				loader.dismiss()
			}
			);
	}

	checkPaymentStatus(bundle) {
		if (bundle.status == 200) {
			this.presentAlert('Success', bundle.order_id)
		}else {
			this.presentAlert('Error', bundle.api_message)
		}

	}

	validateCard(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}


	onlyNumberKey(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}

	bookTicketsPressed(){
		console.log(this.bundleSaveTickets)
		this.sendTicketDetailsToServer()
		this.confirmTicket = false
	}

	presentAlert(title,message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['Okay']
		});
		alert.present();
	}

}
