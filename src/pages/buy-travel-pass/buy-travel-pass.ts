import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Content } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
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

	paymentView = false
	ticketsSaved = true
	confirmTicket = true
	travellerInfoWindow = true
	travellerFormSubmitted = false
	paymentFormSubmitted = false		

	cardType = ''
	finalCost = 0
	orderId = 0

	requestBundle = {user_id: '', token: ''}
	bundleTicketsForServer : Array<TicketStructure> = []
	bundleSaveTickets : Array<TicketStructure> = []
	bundleViewDescription : any[] = [];
	bundleData : {data : any};
	cardDetails = { number: '',exp_month:'' ,exp_year: '',cvc: ''}
	arrayTravellers : Array<TravellersInfoDS> = []
	bundlePaymentData = {name:'', phone:'', address:''}
	orderDetails: {order_no: '' ,transaction_id: ''}
	paymentErrortext =''
	loginErrorText = false
	noTicketChosen = false

	dateForPicker = new Date().getTime();
	pickerDate = ""
	
	constructor(	public navCtrl: NavController, 
					public navParams: NavParams,
					private alertCtrl: AlertController,
					public rest: RestProvider,
					public loadingController: LoadingController,
					private storage: Storage,) {
		
		 this.dateForPicker = this.dateForPicker -  (31536000000*17);
		 this.pickerDate =  new Date(this.dateForPicker).getFullYear() + ""
	}

	ionViewDidLoad() {
		this.getTravelPassData()
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
		this.paymentView = false
		this.ticketsSaved = true
		this.travellerFormSubmitted = false
		this.travellerInfoWindow = true
	}

	continuePressed() {
		this.paymentView = true
		this.travellerInfoWindow = true
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

						this.ticketsSaved = false
						this.initialiseBundle()
						return
					}
				}

				this.ticketsSaved = true
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
															ticket_type: this.bundleSaveTickets[
															adultIndex
															].ticket_type,
														})
			this.travellerInfoWindow = false
		}
	}	

	moveToLoginPage() {
		this.navCtrl.push('LoginPage',{
        'lastPage': 'buyTravelPassPage'
      })
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
			title: '',

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
		this.travellerFormSubmitted = true
		if(form.valid){
			this.travellerInfoWindow = true
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
			err => loader.dismiss(),
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
		this.confirmTicket = false
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
