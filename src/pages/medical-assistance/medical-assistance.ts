import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the MedicalAssistancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-medical-assistance',
 	templateUrl: 'medical-assistance.html',
 })
 export class MedicalAssistancePage {

	pages: Array<{title: string, icon: any, id: any}>;
 	medicalAssistanceSubPages : Array<{id: string, title: any}> = [];
 	bundleData:any

 	constructor(public navCtrl: NavController, public navParams: NavParams,public rest: RestProvider) {
		this.pages =   [
			{title: 'Medical', icon: 'star', id: null},
			{title: 'Lost Passport', icon: 'star', id: 3},
			{title: 'Money', icon: 'star', id: 5},
		];
 	}

 	ionViewDidLoad() {
 		this.getMedicalData()
 	}

 	getMedicalData() {
	  	this.rest.getMedicalAssitancePageData()
	         .subscribe(
	            responseData => this.bundleData = responseData,
	            err => console.log(),
	            () => {
	            	for ( let data of this.bundleData.data ) {
		            	let medicalTempData = {id : data.id, title : data.title}
		            	this.medicalAssistanceSubPages.push(medicalTempData)
		            }	
	            }
	           );
	}

 	medicalAssistanceButtonPressed(page) {
 		this.navCtrl.push('MedicalLocationPage', {
        'id': JSON.stringify(page.id),
      })
 	}

 	buttonBackPressed() {
 		this.navCtrl.pop()
	 }
	 
	 moveToServiceDetails(page) {
		if(page.id != null) {
			  this.navCtrl.push('ServiceDetailsPage', {
			'service': JSON.stringify(page.id),
		  })
		}
	}

	openService() {
		this.navCtrl.setRoot('MedicalAssistancePage')
	  }
	
	  openToday() {
		this.navCtrl.setRoot('InBaliPage')
	  }
	
	  openFavourites() {
			this.navCtrl.setRoot('FavouritesPage')
	  }
	
	  openMe() {
		this.navCtrl.setRoot('AccountPage')
	  }
 }
