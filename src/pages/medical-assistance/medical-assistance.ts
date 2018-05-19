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

 	medicalAssistanceSubPages : Array<{id: string, title: any}> = [];
 	bundleData:any

 	constructor(public navCtrl: NavController, public navParams: NavParams,public rest: RestProvider) {
 		
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
 		this.navCtrl.push('MedicalDetailsPage', {
        'id': JSON.stringify(page.id),
      })
 	}

 	buttonBackPressed() {
 		this.navCtrl.pop()
 	}

 }
