import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Platform } from 'ionic-angular';

import { NgForm } from '@angular/forms';

import { CommonMapPage } from '../common-map/common-map';


/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

	bundleDetails : any = {}

  bundleEnquiry = { first_name: '', last_name: '', phone: '', email: '', subject: '', message: ''}

  submittedEnquiry = false;

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                public rest: RestProvider, 
                public platform: Platform,
                public loadingController: LoadingController,
                public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');

    this.getContactUsInfo()
  }

  getContactUsInfo() {
  	this.rest.getContactUsInfo()
         .subscribe(
            responseData => this.bundleDetails = <{}> responseData,
            err => console.log(err),
            () => {
              console.log(this.bundleDetails)
            }
           );
  }

  buttonShowOnMapPressed() {
    var markerArray : Array<any> = [];
    var marker = {latitude: '', longitude: '', label: ''};

    marker.latitude = this.bundleDetails.office_latitude
    marker.longitude = this.bundleDetails.office_longitude
    marker.label = 'Bali Support Centre'

    markerArray.push(marker);

    this.navCtrl.push(CommonMapPage, {
      'location': JSON.stringify(markerArray)
    });
  }

  buttonSendPressed(form: NgForm) {

    this.submittedEnquiry = true

    if (form.valid) {
      this.submittedEnquiry = false
      this.sendAction(this.bundleEnquiry)
    }
  }

  sendAction(query) {

    let loader = this.loadingController.create({
        content: "Sending ..."
      });

    loader.present();

    this.rest.sendQuery(query)
       .subscribe(
           responseData => this.checkStatus(responseData),
           err => loader.dismiss(),
           () => {
             loader.dismiss()
           }
         );
  }

  checkStatus(bundle) {
      if (bundle.status == 200) {
        this.bundleEnquiry = { first_name: '', last_name: '', phone: '', email: '', subject: '', message: ''}
        this.presentAlert(bundle.api_message)
      }else {
        this.presentAlert(bundle.api_message)
      }

    }

    presentAlert(message) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }

}
