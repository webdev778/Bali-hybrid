import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})

export class ActivationPage {

	constructor(	public navCtrl: NavController, 
  				public navParams: NavParams) {

  	let passedData = this.navParams.get('data');
  	console.log(passedData)
	}
}