import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import {ServiceDetailsPage} from '../service-details/service-details';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

	bundleData : {data : any};
	bundleServices : any[] = [];

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams, 
  				public rest: RestProvider,
  				public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
    this.getServicesList()
  }

  moveToServiceDetails(service) {
  		this.navCtrl.push(ServiceDetailsPage, {
        'service': JSON.stringify(service),
      })
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


}
