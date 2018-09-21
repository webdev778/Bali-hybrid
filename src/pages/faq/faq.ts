import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  pages: Array<{title: string, icon: any, page: any}>;
  responseData : {data: any} ;
	bundleDataFAQ : Array<{question: string, answer: string, isOpen: Boolean}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    this.pages =   [
      {title: 'FAQ', icon: 'faq', page: 'FaqPage'},
      {title: 'Buy Support', icon: 'buy_travel_pass', page: 'BuyTravelPassPage'},
      {title: 'Contact Us', icon: 'contact_us', page: 'ContactUsPage'},
    ];
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
