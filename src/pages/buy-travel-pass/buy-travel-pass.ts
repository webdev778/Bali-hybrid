import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { TicketStructure, TravellersInfoDS } from '../../providers/constants/constants';
import { StripeProvider } from '../../providers/stripe/stripe';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
	selector: 'page-buy-travel-pass',
	templateUrl: 'buy-travel-pass.html',
})


export class BuyTravelPassPage {

	paymentView = false
	ticketsSaved = true

	cardType = ''
	finalCost = 0

	bundleSaveTickets : Array<TicketStructure> = []

	bundleViewDescription : any[] = [];

	bundleData : {data : any};

	cardDetails = {cardNumber:'',cvv:'',mm:'',yy:'' }

	arrayTravellers : Array<TravellersInfoDS> = []
	travellerFormSubmitted = false		  

	constructor(	public navCtrl: NavController, 
		public navParams: NavParams,
		private alertCtrl: AlertController,
		public rest: RestProvider,
		public loadingController: LoadingController,
		private storage: Storage,
		private stripe: StripeProvider) {
	}


	ionViewDidLoad() {
		this.getTravelPassData()
	}


	incrementValue(ticket) {
		ticket.quantity++;
	}


	decrementValue(ticket) {
		if (ticket.quantity <= 0) {
			ticket.quantity=0;
		}else{
			ticket.quantity--;
		}
	}


	getTotalCost(){

		this.finalCost = 0

		for (let ticket of this.bundleSaveTickets) {
			this.finalCost = this.finalCost + ticket.price
		} 		
	}


	initialiseBundle(){

		for (var count = 0 ; count < this.bundleSaveTickets.length; count++) 
		{
			this.bundleSaveTickets[count].ticket_id = this.bundleViewDescription[count].id
			this.bundleSaveTickets[count].quantity = this.bundleViewDescription[count].quantity
			this.bundleSaveTickets[count].price = this.bundleViewDescription[count].quantity * this.bundleViewDescription[count].price
		}

		this.getTotalCost()
	}


	sendDataToServer() {

		let loader = this.loadingController.create({
			content: "Sending ..."
		});

		loader.present();

		let passInfo = {user_id:'1', ticket_info: this.bundleSaveTickets}

		this.rest.purchaseTravelPass(passInfo)
		.subscribe(
			responseData => this.checkStatus(responseData),
			err => loader.dismiss(),
			() => {
				loader.dismiss()
				this.resetValues()
			}
			);
	}


	savePressed(){

		for (let ticket of this.bundleViewDescription)
		{
			if (ticket.quantity > 0) {

				this.ticketsSaved = false;
				this.initialiseBundle()
				return
			}
		}

		this.ticketsSaved = true;
		this.presentAlertNoTickets()
	}

	editPressed() {
		this.paymentView = false
		this.ticketsSaved = true
	}

	continuePressed(){
		this.checkForLogin()	
	}

	checkForLogin() {
		this.storage.get('is_login').then((isLogin) => {
			if (!isLogin) {
				this.presentAlertNotLoggedIn()
			}
			else{
				this.paymentView = true
				this.initialiseArrayTraveller()
			}
		})
	}


	initialiseArrayTraveller() {

		this.arrayTravellers = []

		for (var count = 1; count <= this.bundleSaveTickets[0].quantity; count++)
		{
			this.arrayTravellers.push(<TravellersInfoDS> {first_name:'', last_name:'', gender:'', email:''})
		}
	}


	makePayment(){
		this.sendDataToServer()
	}

	moveToLoginPage() {
		this.navCtrl.setRoot('LoginPage')
	}


	resetValues(){
		for (let ticket of this.bundleSaveTickets) 
		{
			ticket = <TicketStructure> {}
		}

		this.finalCost = 0
	}


	presentAlertNoTickets() {
		let alert = this.alertCtrl.create({
			title: 'No Tickets',
			subTitle: 'Please select a ticket',
			buttons: ['OK']
		});
		alert.present();
	}


	presentAlertNotLoggedIn(){
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
		alert.present();
	}


	getTravelPassData(){
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

	buttonSubmitPressed() {
		console.log(this.arrayTravellers)
		this.travellerFormSubmitted = true
	}


	checkStatus(bundle) {

		if (bundle.status == 200) {
			this.presentAlert('', bundle.api_message)
		}else {
			this.presentAlert('Error', bundle.api_message)
		}

	}


	getCardType(cardNumber) {
		this.cardType = String(this.stripe.getCardType(cardNumber))
		console.log(this.stripe.getCardType(cardNumber))
	}

	presentAlert(title,message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['OK']
		});
		alert.present();
	}

}
