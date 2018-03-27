import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {ServiceDetailsPage} from '../service-details/service-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bundleData : {data : any};
	bundleServices : any[] = [];
  textSupport = "We provide Australians travelling to Bali, support 24 hours a day, 7 Days a week. Lost Passport - Lost / Delayed Luggage - Medical Assistance ( Doctor, Dentist, Hospital )EMERGENCY Money - Lost Medication ( URGENTLY required within 12 - 24 hours) Lost / Stolen personal items - Money, Credit Cards, Wallet, Purse, Mobile phone, etc."

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                public rest: RestProvider, 
                public loadingController: LoadingController) {

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.getServicesList()
  }

  getServicesList() {
  	this.rest.getServices()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => console.log(err),
            () => {
              console.log(this.bundleData)
              this.bundleServices = <any[]> this.bundleData.data;
            }
           );
  }

  moveToServiceDetails(service) {
      this.navCtrl.push(ServiceDetailsPage, {
        'service': JSON.stringify(service),
      })
   }
  

}
