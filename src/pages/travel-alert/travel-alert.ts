import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the TravelAlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-travel-alert',
  templateUrl: 'travel-alert.html',
})
export class TravelAlertPage {

	bundleData : {data : any};
	bundleAlerts : any[] = [];

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				public rest: RestProvider) {
  }

  ionViewDidLoad() {
    this.getAlerts()
  }

  buttonBackPressed() {
    this.navCtrl.pop();
  }

  getAlerts() {
  	this.rest.getAlerts()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => console.log(err),
            () => {
              this.bundleAlerts = <any[]> this.bundleData.data;
            }
           );
  }

}
