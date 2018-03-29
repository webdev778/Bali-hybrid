import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CommonMapPage } from '../common-map/common-map';

/**
 * Generated class for the VaccinationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vaccination',
  templateUrl: 'vaccination.html',
})
export class VaccinationPage {

	bundleData : {data: any};
	arrayHospitals : any[] = [];

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				public rest: RestProvider) {
  }

  ionViewDidLoad() {

    this.getHospitals()
  }

  buttonBackPressed() {
    this.navCtrl.pop();
  }

  getHospitals() {
  	this.rest.getHospitals()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => console.log(err),
            () => {
              this.arrayHospitals = this.bundleData.data
            }
           );
  }

  buttonShowOnMapPressed(hospital) {
    var markerArray : Array<any> = [];
    var marker = {latitude: '', longitude: '', label: ''};

    marker.latitude = hospital.lat
    marker.longitude = hospital.long
    marker.label = hospital.name

    markerArray.push(marker);

    this.navCtrl.push(CommonMapPage, {
      'location': JSON.stringify(markerArray)
    });
  }

}
