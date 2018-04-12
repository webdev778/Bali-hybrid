import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  isListLoaded = false

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams, 
  				public rest: RestProvider,
          public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.getServicesList()
  }

  moveToServiceDetails(service) {
  		this.navCtrl.push(ServiceDetailsPage, {
        'service': JSON.stringify(service),
      })
 	}

  getServicesList() {

    let loader = this.loadingController.create({
          content: "Loading ..."
    });

    // loader.present()

  	this.rest.getServices()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => loader.dismiss(),
            () => {
              loader.dismiss()
              this.isListLoaded = true
              this.bundleServices = <any[]> this.bundleData.data;
            }
           );
  }


}
