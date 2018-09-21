import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {

	bundleData : {data: any};
  bundleStatus : any[] = [];

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				public rest: RestProvider,) {

  }
  
  ionViewDidLoad() {
    this.getWeather()
  }

  buttonBackPressed() {
    this.navCtrl.pop();
  }

  getWeather() {
  	// this.rest.getWeather()
        //  .subscribe(
        //     responseData => this.bundleData = <{data : any}> responseData,
        //     err => console.log(''),
        //     () => {
        //       this.bundleStatus = <any[]> this.bundleData.data;
              
        //     }
        //    );
  }

}
