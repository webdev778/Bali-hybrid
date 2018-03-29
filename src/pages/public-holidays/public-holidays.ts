import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the PublicHolidaysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-public-holidays',
  templateUrl: 'public-holidays.html',
})
export class PublicHolidaysPage {

	bundleData : {data : any};
	bundleHolidays : any[] = [];

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				public rest: RestProvider) {
  }

  ionViewDidLoad() {
    this.getHolidays()
  }

  buttonBackPressed() {
    this.navCtrl.pop();
  }

  getHolidays() {
  	this.rest.getHolidays()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => console.log(err),
            () => {
              this.bundleHolidays = <any[]> this.bundleData.data;
            }
           );
  }

}
