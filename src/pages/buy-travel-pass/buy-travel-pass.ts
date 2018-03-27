import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

 @IonicPage()
 @Component({
 	selector: 'page-buy-travel-pass',
 	templateUrl: 'buy-travel-pass.html',
 })

 export class BuyTravelPassPage {

 	arrayTicketCount : any[] = [0,0,0]
 	unitCost : any[] = [100,200,300]
 	totalCost : any[] = [0,0,0]
 	finalCost = 0

 	unitComponent = ['1 Child : $','1 Adult : $','1 Family : $']
 	constraintText = ['(Age: 0-15 years)','(Age: 16 and over)','Family (2) Adults and (2) Children']
 	indexes = [0,1,2]
    validityMessage = 'Valid For 60 Days on ARRIVAL'
    ticketType = ['Child','Adult','Family']

 	bundleSaveTickets = { child_ticket_quantity: 0, child_ticket_amount: 0, adult_ticket_quantity: 0, adult_ticket_amount: 0, 
 						  family_ticket_quantity: 0, famliy_ticket_amount: 0, total_amount: 0}

	constructor(	public navCtrl: NavController, 
					public navParams: NavParams,
					private alertCtrl: AlertController) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad BuyTravelPassPage');
 		console.log(this.arrayTicketCount)
 	}

 	incrementValue(count,flag) {
 		count++;

 		this.arrayTicketCount[flag] = count;
 		this.totalCost[flag] = count * this.unitCost[flag]

 		this.getTotalCost()
 	}

 	decrementValue(count,flag) {
 		if (count <= 0) {
 			count=0;
 		}else{
 			count--;
 		}
 		
 		this.arrayTicketCount[flag] = count;
 		this.totalCost[flag] = count * this.unitCost[flag]
 		
 		this.getTotalCost()

 	}

 	getTotalCost(){
 		this.finalCost = this.totalCost[0] + this.totalCost[1] + this.totalCost[2];
 		
 	}


	initialiseBundle(){
		this.bundleSaveTickets.child_ticket_quantity = this.arrayTicketCount[0];
 		this.bundleSaveTickets.child_ticket_amount = this.totalCost[0];

 		this.bundleSaveTickets.adult_ticket_quantity = this.arrayTicketCount[1];
 		this.bundleSaveTickets.adult_ticket_amount = this.totalCost[1];

 		this.bundleSaveTickets.family_ticket_quantity = this.arrayTicketCount[2];
 		this.bundleSaveTickets.famliy_ticket_amount = this.totalCost[2];

 		this.bundleSaveTickets.total_amount = this.finalCost;
 	}

 	savePressed(){

		if((this.arrayTicketCount[0] == 0) && (this.arrayTicketCount[1] == 0) && (this.arrayTicketCount[2] == 0)){
 			this.presentAlertNoTickets();
 		}	
 		else{
	 		this.initialiseBundle();
	 		console.log(this.bundleSaveTickets)
	 	}	
 	}

 	presentAlertNoTickets() {
		  let alert = this.alertCtrl.create({
		    title: 'No Tickets',
		    subTitle: 'Please select a ticket',
		    buttons: ['Dismiss']
		  });
		  alert.present();
	}	

 }
