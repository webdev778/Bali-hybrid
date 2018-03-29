import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';



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

 	description = 'description';

    ticketType = ['Child','Adult','Family']

 	bundleSaveTickets = { child_ticket_quantity: 0, child_ticket_amount: 0, adult_ticket_quantity: 0, adult_ticket_amount: 0, 
 						  family_ticket_quantity: 0, famliy_ticket_amount: 0, total_amount: 0}

 	bundleViewDescription : any[] = [];

 	bundleData : {data : any};					  

	constructor(	public navCtrl: NavController, 
					public navParams: NavParams,
					private alertCtrl: AlertController,
					public rest: RestProvider) {
 	}

 	ionViewDidLoad() {
 		// this.getTravelPassData()
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


	getTravelPassData(){
  	this.rest.getTravelPass()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => console.log(err),
            () => {
              this.bundleViewDescription = <any[]> this.bundleData.data;
            }
           );
  }



 }
