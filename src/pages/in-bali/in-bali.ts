import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the InBaliPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-in-bali',
  templateUrl: 'in-bali.html',
})
export class InBaliPage {

  pages: Array<{name: string, icon: any, page: any}>;
  headerpages: Array<{title: string, icon: any, page: any}>;
  pagesData : {data: any};
	cmsPages : Array<any> = [];

  constructor(	public navCtrl: NavController, 
  				      public navParams: NavParams,
                public rest: RestProvider,) {

  	this.pages = [
            {name: 'Exchange Rate', icon: 'exchange-rate', page: 'ExchangeRatePage'},
            {name: 'Volcano Status', icon: 'volcano-status', page: 'VolcanoStatusPage'},
            {name: 'Vaccinations', icon: 'vaccinations', page: 'VaccinationPage'},
            {name: 'Banks', icon: 'vaccinations', page: 'PageBankPage'},
            {name: 'ATMS', icon: 'vaccinations', page: 'PageAtmsPage'},
            {name: 'Bali Public Holidays', icon: 'public-holidays', page: 'PublicHolidaysPage'},
            {name: 'Travel Alerts', icon: 'travel-alerts', page: 'TravelAlertPage'},
            {name: 'Weather', icon: 'travel-alerts', page: 'WeatherPage'},
            {name: 'Sim Cards', icon: 'travel-alerts', page: 'SimCardPage'},
    ];

    this.headerpages =   [
        {title: 'Today', icon: 'today', page: 'InBaliPage'},
        {title: 'ATMs Banks', icon: 'vaccinations', page: 'PageAtmsPage'},
        {title: 'Exchange Rate', icon: 'exchange-rate', page: 'ExchangeRatePage'},
    ];

    this.getBaliCMSPages()
  }

  getBaliCMSPages() {
    
    this.rest.getBaliPages()
         .subscribe(
            responseData => this.pagesData = <{data:any}> responseData,
            err => console.log(),
            () => {
              this.cmsPages = this.pagesData.data
              for (let page of this.cmsPages) {
                this.pages.push(page)
              }
            }
           );
  }

  ionViewDidLoad() {
  }

  moveToDetails(page) {
    if (page.page == undefined) {
      this.navCtrl.push('AboutUsPage', {'data': JSON.stringify(page.id), isPushed: true})
    }else{
      this.navCtrl.push(page.page)
    }
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
