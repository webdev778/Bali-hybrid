import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CommonMapPage } from '../common-map/common-map';

/**
 * Generated class for the PageBankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-bank',
  templateUrl: 'page-bank.html',
})
export class PageBankPage {

	bundleData : {data: any};
	arrayBanks : any[] = [];
  isListLoaded = false

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				public rest: RestProvider) {
  }

  ionViewDidLoad() {
    this.getBanks()
  }

  buttonBackPressed() {
    this.navCtrl.pop();
  }

  getBanks() {
  	this.rest.getBanks()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => console.log(),
            () => {
              this.isListLoaded = true
              this.arrayBanks = this.bundleData.data
            }
           );
  }

  buttonShowOnMapPressed(bank) {
    var markerArray : Array<any> = [];
    var marker = {latitude: '', longitude: '', label: ''};

    marker.latitude = bank.lat
    marker.longitude = bank.long
    marker.label = bank.bankname

    let markerString = marker.latitude + ',' + marker.longitude + ',' + marker.label

    markerArray.push(markerString);

    this.navCtrl.push(CommonMapPage, {
      'location': JSON.stringify(markerArray)
    });
  }

}
