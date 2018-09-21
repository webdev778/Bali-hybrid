import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

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
  isListLoaded = false

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
              this.isListLoaded = true
              this.arrayHospitals = this.bundleData.data
              console.log(this.arrayHospitals)
            }
           );
  } 

  buttonShowOnMapPressed(hospital) {
    var markerArray : Array<any> = [];
    var marker = {latitude: '', longitude: '', label: ''};

    marker.latitude = hospital.lat
    marker.longitude = hospital.long
    marker.label = hospital.name

    let markerString = marker.latitude + ',' + marker.longitude + ',' + marker.label
    markerArray.push(markerString);

    this.navCtrl.push('CommonMapPage', {
      'location': JSON.stringify(markerArray)
    });
  }

}
