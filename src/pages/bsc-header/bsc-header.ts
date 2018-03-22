import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { HomePage } from '../home/home';
import { InBaliPage } from '../in-bali/in-bali';
import { FaqPage } from '../faq/faq';
import { AboutUsPage } from '../about-us/about-us';
import { ServicesPage } from '../services/services';
import { BuyTravelPassPage } from '../buy-travel-pass/buy-travel-pass';
import { ContactUsPage } from '../contact-us/contact-us';
import { LoginPage } from '../login/login';
import { CMS_PAGES } from '../../providers/constants/constants'

/**
 * Generated class for the BscHeaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Injectable()
@IonicPage()
@Component({
  selector: 'page-bsc-header',
  templateUrl: 'bsc-header.html',
})
export class BscHeaderPage {

  bundlePagesData : {data : any};

  pages: Array<{title: string, icon: any, page: any}>;
  cmsPages : Array<{id: any, name: '', alias: '', page: any}>;
  loginPage: Array<{title: string, icon: any, page: any}>;

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                public rest: RestProvider, 
                public loadingController: LoadingController, 
                private alertCtrl: AlertController) {

    this.getCMSPages()

    this.pages = [
            {title: 'Home', icon: 'home', page: HomePage},
            {title: 'Today In Bali', icon: 'today_in_bali', page: InBaliPage},
            {title: 'FAQ', icon: 'faq', page: FaqPage},
            {title: 'Our Services', icon: 'our_services', page: ServicesPage},
            {title: 'Buy Travel Pass', icon: 'buy_travel_pass', page: BuyTravelPassPage},
            {title: 'Contact Us', icon: 'contact_us', page: ContactUsPage},
    ];

    this.loginPage = [{title: 'LOGIN', icon: 'log_in', page: LoginPage}];
  }


  getCMSPages() {
    this.cmsPages = CMS_PAGES;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.page == undefined) {
      this.navCtrl.setRoot(AboutUsPage, {data: page, isPushed: false})
    }else {
      this.navCtrl.setRoot(page.page)
    }
  }

}
