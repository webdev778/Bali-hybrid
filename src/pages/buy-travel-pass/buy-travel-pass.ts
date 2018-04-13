import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {TicketStructure} from '../../providers/constants/constants';
import { ConstantsProvider } from '../../providers/constants/constants';
import { Storage } from '@ionic/storage';


 @IonicPage()
 @Component({
 	selector: 'page-buy-travel-pass',
 	templateUrl: 'buy-travel-pass.html',
 })


 export class BuyTravelPassPage {

 	paymentView = false
 	arrayTicketCount : any[] = []
 	totalCost : any[] = []
 	finalCost = 0
 	ticketsSaved = true

 	bundleSaveTickets : Array<TicketStructure> = []

 	bundleViewDescription : any[] = [];

 	bundleData : {data : any};

 	cardDetails = {cardNumber:'',cvv:0,expiry:'' }					  

	constructor(	public navCtrl: NavController, 
					public navParams: NavParams,
					private alertCtrl: AlertController,
					public rest: RestProvider,
					public loadingController: LoadingController,
					private storage: Storage) {
 	}


 	ionViewDidLoad() {
 		 this.getTravelPassData()
 	}


 	incrementValue(count,flag) {
 		count++;

 		this.arrayTicketCount[flag] = count;
 		this.totalCost[flag] = count * this.bundleViewDescription[flag].price

 		this.getTotalCost()
 	}


 	decrementValue(count,flag) {
 		if (count <= 0) {
 			count=0;
 		}else{
 			count--;
 		}
 		
 		this.arrayTicketCount[flag] = count;
 		this.totalCost[flag] = count * this.bundleViewDescription[flag].price
 		
 		this.getTotalCost()
 	}


 	getTotalCost(){

 		this.finalCost = 0

 		for (let price of this.totalCost) {
 			this.finalCost = this.finalCost + price
 		} 		
 	}


	initialiseBundle(){

		for (var count = 0 ; count < this.bundleSaveTickets.length; count++) 
		{
			this.bundleSaveTickets[count].ticket_id = this.bundleViewDescription[count].id
			this.bundleSaveTickets[count].quantity = this.arrayTicketCount[count]
			this.bundleSaveTickets[count].price = this.totalCost[count]
		}

		this.sendDataToServer()
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

 		for (let count of this.arrayTicketCount)
 		{
 			if (count > 0) {
 				this.ticketsSaved = false;
 				return
 			}
 		}

 		this.presentAlertNoTickets()
 	}


 	continuePressed(){
		this.checkForLogin()	
 	}

	checkForLogin() {
 		this.storage.get('is_login').then((isLogin) => {
 			if (isLogin)
	 		{
	 			this.paymentView = true
	 		}
	 		else
	 		{
	 			this.presentAlertNotLoggedIn()
	 		}
	 		
	 	})
 	}

 	makePayment(){
 		
	}

 	moveToLoginPage() {
 		this.navCtrl.setRoot('LoginPage')
 	}


 	resetValues(){
 		for (var count = 0 ; count < this.bundleSaveTickets.length; count++) 
		{
			this.arrayTicketCount[count] = 0
			this.totalCost[count] = 0
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
	              	this.arrayTicketCount.push(0)
	              	this.totalCost.push(0)

	              	let ticketInfo = <TicketStructure> {}
	              	ticketInfo.price = 0
	              	ticketInfo.quantity = 0
	              	ticketInfo.ticket_id = 0

	              	this.bundleSaveTickets.push(ticketInfo)
	              }

	            }
	    	);
	 }


	checkStatus(bundle) {

      if (bundle.status == 200) {
        this.presentAlert('', bundle.api_message)
      }else {
        this.presentAlert('Error', bundle.api_message)
      }

    }


    presentAlert(titlemsg,subtitlemsg) {
      let alert = this.alertCtrl.create({
        title: titlemsg,
        subTitle: subtitlemsg,
        buttons: ['OK']
      });
      alert.present();
    }

 }
