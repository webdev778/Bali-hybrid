import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the PageAtmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-atms',
  templateUrl: 'page-atms.html',
})
export class PageAtmsPage {

	bundleData : {data: any};
	arrayAtms : any[] = [];
  isListLoaded = false

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				public rest: RestProvider) {

    this.getAtms()
  }

  ionViewDidLoad() {
  }

  buttonBackPressed() {
    this.navCtrl.pop();
  }

  getAtms() {
  	this.rest.getAtms()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => console.log(),
            () => {
              this.isListLoaded = true
              this.arrayAtms = this.bundleData.data
            }
           );
  }

  buttonShowOnMapPressed(atm) {
    var markerArray : Array<any> = [];
    var marker = {latitude: '', longitude: '', label: ''};

    marker.latitude = atm.lat
    marker.longitude = atm.long
    marker.label = atm.bankname

    let markerString = marker.latitude + ',' + marker.longitude + ',' + marker.label
    
    markerArray.push(markerString);

    this.navCtrl.push('CommonMapPage', {
      'location': JSON.stringify(markerArray)
    });
  }

}
