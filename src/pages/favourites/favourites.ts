import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  responseData : {data: any} ;
	bundleDataFAQ : Array<{question: string, answer: string, isOpen: Boolean}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    this.getFAQList()
  }

  getFAQList() {
  	this.rest.getFAQ()
         .subscribe(
            responseData => this.responseData = <{data: any}> responseData,
            err => console.log(),
            () => {
              this.bundleDataFAQ = this.responseData.data
            }
           );
  }


  toggleSection(section) {
  	section.isOpen = !section.isOpen
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
