import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the ServiceDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-details',
  templateUrl: 'service-details.html',
})
export class ServiceDetailsPage {

	serviceDetails = {image_name: '',title: '', description: ''};

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams) {

  	let passedData = this.navParams.data
  	console.log('Passed Data :', passedData)
  	this.serviceDetails.title = passedData.title
  	this.serviceDetails.description = passedData.description
  	this.serviceDetails.image_name = passedData.image_name
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceDetailsPage');
  }

  buttonBackPressed() {
    this.navCtrl.pop();
  }

}
