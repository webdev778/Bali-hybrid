import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Content } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ConstantsProvider } from '../../providers/constants/constants';
import { TicketStructure, TravellersInfoDS } from '../../providers/constants/constants';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { PaymentStatusPage } from '../payment-status/payment-status';

@IonicPage()
@Component({
	selector: 'page-buy-travel-pass',
	templateUrl: 'buy-travel-pass.html',
})

export class BuyTravelPassPage {

	@ViewChild(Content) content: Content;

	scrollToTop() {
		this.content.scrollToTop(400);
	}
	
	travellerFormSubmitted = false
	paymentFormSubmitted = false	
	statusForView = 0	

	cardType = ''
	finalCost = 0
	orderId = 0

	requestBundle = {user_id: '', token: ''}
	bundleTicketsForServer : Array<TicketStructure> = []
	bundleSaveTickets : Array<TicketStructure> = []
	bundleViewDescription : any[] = [];
	bundleData : {data : any};
	cardDetails = { number: '',exp_month:null ,exp_year: null,cvc: ''}
	arrayTravellers : Array<TravellersInfoDS> = []
	bundlePaymentData = {name:'', phone:'', address:''}
	orderDetails: {order_no: '' ,transaction_id: ''}
	paymentErrortext =''
	loginErrorText = false
	noTicketChosen = false

	errorDateOfBirth = ""

	constructor(	public navCtrl: NavController, 
					public navParams: NavParams,
					private alertCtrl: AlertController,
					public rest: RestProvider,
					public loadingController: LoadingController,
					private storage: Storage,
					private constantProider : ConstantsProvider) {
	}

	ionViewDidLoad() {
		this.getTravelPassData();
	}

	incrementValue(ticket) {
		this.noTicketChosen = false
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
			this.scrollToTop()
		}
		
		this.getTotalCost()
	}

	savePressed() {
		this.checkForLogin()
	}

	editPressed() {
		this.statusForView = 0
	}

	continuePressed() {
		this.statusForView = 1
		this.scrollToTop()
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
				this.loginErrorText = true
			}
			else{
				this.storage.get('user_data').then((user_data) => {
					this.requestBundle.user_id = JSON.parse(user_data).id;
					this.storage.get('auth_token').then((authToken) => {
						this.requestBundle.token = authToken;	
					});
				});

				for (let ticket of this.bundleViewDescription) {
					if (ticket.quantity > 0) {
						this.initialiseBundle()
						this.statusForView = 1
						this.scrollToTop()
						return
					}
				}
				this.noTicketChosen = true				
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
				date_of_birth: '',
				ticket_type: this.bundleSaveTickets[adultIndex].ticket_type,
				error_dob : ''
			})
		}

		this.statusForView = 2
		this.scrollToTop()
	}	

	moveToLoginPage() {
		this.navCtrl.push('LoginPage',{
			'lastPage': 'buyTravelPassPage'
		})
	}

	getTravelPassData() {
		let loader = this.loadingController.create({
			content: "Loading Travel Passes ..."
		});
		loader.present()

		this.rest.getTravelPass()
		.subscribe(
			responseData => this.bundleData = <{data : any}> responseData,
			err => this.rest.alertServerError(err,loader),
			() => {
				loader.dismiss()
				this.bundleViewDescription = <any[]> this.bundleData.data;
				for (let ticket of this.bundleViewDescription) {
					ticket['quantity'] = 0
					
					this.bundleSaveTickets.push(<TicketStructure> {ticket_type: ticket.title})
				}

			}
			);
	}

	buttonSubmitPressed(form: NgForm) {
		this.travellerFormSubmitted = true
		for (let traveller of this.arrayTravellers) {

			if (traveller.date_of_birth != '')
			{
				traveller.error_dob = this.constantProider.validateDate(traveller.date_of_birth, 'Adult')
			}

			if(traveller.date_of_birth == '' || traveller.email == '' || traveller.first_name == '' ||
				traveller.last_name == '' || traveller.gender == '') {
				
				this.travellerFormSubmitted = true
			}
			else {
				this.travellerFormSubmitted = false
			}

			if (traveller.error_dob != "")
			{
				this.travellerFormSubmitted = true
			}
		}

		if(!this.travellerFormSubmitted && form.valid){
			this.addAdultInformation()
			this.sendTicketDetailsToServer()
		}
	}

	addAdultInformation() {
		let adultTicket = this.bundleSaveTickets[ this.bundleSaveTickets.findIndex(obj=> obj.ticket_id === 1) ]
		adultTicket.ticket_details = this.arrayTravellers
	}

	makePayment(form: NgForm) {
		this.paymentFormSubmitted = true

		if(form.valid){
			this.paymentFormSubmitted = false
			this.sendPaymentDetailsToServer()	
		}
	}

	sendTicketDetailsToServer() {
		let loader = this.loadingController.create({
			content: "Please Wait ..."
		});

		this.createTicketBundleForServer()

		loader.present()

		let passInfo = {
			user_id:this.requestBundle.user_id,
			token: this.requestBundle.token,
			ticket_bundle: this.bundleTicketsForServer, 
			total_cost: this.finalCost 
		}

		this.rest.purchaseTravelPass(passInfo)
		.subscribe(
			responseData => this.checkTicketStatus(responseData),
			err => this.rest.alertServerError(err,loader),
			() => {
				loader.dismiss()
			}
			);
	}

	createTicketBundleForServer() {
		this.bundleTicketsForServer = []
		for( let ticket of this.bundleSaveTickets) {
			if( ticket.quantity > 0 ) {
				this.bundleTicketsForServer.push(ticket)
			}
		}
	}

	checkTicketStatus(bundle) {
		if (bundle.status == 200) {
			this.orderId = bundle.order_id
			this.statusForView = 3
			this.scrollToTop()
		}else {
			this.presentAlert('Something Went Wrong', bundle.api_message)
		}
	}

	sendPaymentDetailsToServer(){
		let loader = this.loadingController.create({
			content: "Making Payment ..."
		});

		loader.present();

		this.paymentErrortext = ""

		let paymentInfo = {
			user_id:this.requestBundle.user_id,
			order_id: this.orderId,
			token: this.requestBundle.token,
			billing_info: this.bundlePaymentData, 
			card_details: this.cardDetails 
		}

		this.rest.makeTravelPassPayment(paymentInfo)
		.subscribe(
			responseData => this.checkPaymentStatus(responseData),
			err => this.rest.alertServerError(err,loader),
			() => {
				loader.dismiss()
			}
			);
	}

	checkPaymentStatus(bundle) {
		if (bundle.status == 200) {
			this.orderDetails = bundle.order_details
			this.navCtrl.push(PaymentStatusPage,{'order-details': JSON.stringify(this.orderDetails)})
		}else {
			this.paymentErrortext =  bundle.api_message
		}
	}

	validateCard(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}


	onlyNumberKey(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}

	bookTicketsPressed(){
		this.sendTicketDetailsToServer()
	}

	presentAlert(title,message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: [
			{
				text : 'Okay',
			}
			]

		});
		alert.present();
	}
}
