import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { BuyTravelPassPage } from '../pages/buy-travel-pass/buy-travel-pass';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { FaqPage } from '../pages/faq/faq';
import { InBaliPage } from '../pages/in-bali/in-bali';
import { LoginPage } from '../pages/login/login';
import { ServicesPage } from '../pages/services/services';

import { RestProvider } from '../providers/rest/rest';
import { CMS_PAGES } from '../providers/constants/constants';
import { SOCIAL_LINKS } from '../providers/constants/constants';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  socialLinks: any;

  bundlePagesData : {data : any};

  pages: Array<{title: string, icon: any, page: any}>;
  cmsPages : Array<{id: any, name: '', alias: '', page: any}>;
  loginPage: Array<{title: string, icon: any, page: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public rest: RestProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
            {title: 'Home', icon: 'home', page: HomePage},
            {title: 'Today In Bali', icon: 'today_in_bali', page: InBaliPage},
            {title: 'FAQ', icon: 'faq', page: FaqPage},
            {title: 'Our Services', icon: 'our_services', page: ServicesPage},
            {title: 'Buy Travel Pass', icon: 'buy_travel_pass', page: BuyTravelPassPage},
            {title: 'Contact Us', icon: 'contact_us', page: ContactUsPage},
    ];

    this.loginPage = [{title: 'LOGIN', icon: 'log_in', page: LoginPage}];

    this.getCMSPages();
    this.getSocialLinks()

  }

  getCMSPages() {
    this.rest.getCMSPages()
         .subscribe(
            responseData => this.bundlePagesData = <{data: any}> responseData,
            err => console.log(err),
            () => {
              this.cmsPages = this.bundlePagesData.data

              for ( let page of this.cmsPages ) {
                CMS_PAGES.push(page);
              }
              console.log(this.cmsPages)
            }
           );
  }

  getSocialLinks() {

      this.rest.getSocialLink()
         .subscribe(
            responseData => this.socialLinks = responseData,
            err => console.log(err),
            () => {
              console.log(this.socialLinks);
              SOCIAL_LINKS.facebook = this.socialLinks.facebook;
              SOCIAL_LINKS.twitter = this.socialLinks.twitter;
              SOCIAL_LINKS.google = this.socialLinks.google;
            }
           );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.page == undefined) {
      this.nav.setRoot(AboutUsPage, page)
    }else {
      this.nav.setRoot(page.page)
    }
  }
}
