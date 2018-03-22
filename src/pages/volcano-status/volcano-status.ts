import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the VolcanoStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volcano-status',
  templateUrl: 'volcano-status.html',
})
export class VolcanoStatusPage {

	bundleData : {data: any};

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				public rest: RestProvider,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolcanoStatusPage');
    this.getVolcanoStatus()
  }

  buttonBackPressed() {
    this.navCtrl.pop();
  }

  getVolcanoStatus() {
  	this.rest.getVolcanoStatus()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => console.log(err),
            () => {
              console.log(this.bundleData)
              
            }
           );
  }

}
