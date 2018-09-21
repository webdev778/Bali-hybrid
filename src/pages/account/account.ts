import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Platform } from 'ionic-angular';
import { NgForm } from '@angular/forms';



/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

	bundleDetails : any = {}

  bundleEnquiry = { first_name: '', last_name: '', phone: '', email: '', subject: '', message: ''}

  submittedEnquiry = false;

  pages: Array<{title: string, icon: any, page: any}>;

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                public rest: RestProvider, 
                public platform: Platform,
                public loadingController: LoadingController,
                public alertCtrl: AlertController) {
    this.pages =   [
      {title: 'Account', icon: 'account', page: 'AccountPage'},
      {title: 'Documents', icon: 'document', page: 'DocumentPage'},
      {title: 'Contacts', icon: 'contact', page: 'ContactPage'},
    ];
  }

  ionViewDidLoad() {
    this.getContactUsInfo()
  }

  getContactUsInfo() {
  	this.rest.getContactUsInfo()
         .subscribe(
            responseData => this.bundleDetails = <{}> responseData,
            err => console.log(err),
            () => {
            }
           );
  }

  buttonShowOnMapPressed() {
    var markerArray : Array<any> = [];
    var marker = {latitude: '', longitude: '', label: ''};

    marker.latitude = this.bundleDetails.office_latitude
    marker.longitude = this.bundleDetails.office_longitude
    marker.label = 'Bali_Support_Centre'

    let markerString = marker.latitude + ',' + marker.longitude + ',' + marker.label

 
    markerArray.push(markerString);

    this.navCtrl.push('CommonMapPage', {
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
           err => this.rest.alertServerError(err,loader),
           () => {
             loader.dismiss()
           }
         );
  }

  checkStatus(bundle) {
      if (bundle.status == 200) {
        this.bundleEnquiry = { first_name: '', last_name: '', phone: '', email: '', subject: '', message: ''}
        this.presentAlert( bundle.api_message)
      }else {
        this.presentAlert(bundle.api_message)
      }

    }

    presentAlert(subtitlemsg) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: subtitlemsg,
        buttons: ['OK']
      });
      alert.present();
    }

    
    onlyNumberKey(event) {
      return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    openPage(page) {
      if (page.page == undefined) {
        this.navCtrl.setRoot('AboutUsPage', {'data': JSON.stringify(page.id), isPushed: false})
      }else {
          this.navCtrl.setRoot(page.page)
      }
    }

    openService() {
      this.navCtrl.setRoot('MedicalAssistancePage')
    }
  
    openToday() {
      this.navCtrl.setRoot('InBaliPage')
    }
  
    openFavourites() {
      this.navCtrl.setRoot('FavouritesPage')
    }
  
    openMe() {
      this.navCtrl.setRoot('AccountPage')
    }
}
