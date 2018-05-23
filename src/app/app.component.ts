import { Component, ViewChild } from '@angular/core';
import { Nav, Platform , LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { BuyTravelPassPage } from '../pages/buy-travel-pass/buy-travel-pass';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { FaqPage } from '../pages/faq/faq';
import { InBaliPage } from '../pages/in-bali/in-bali';
import { ServicesPage } from '../pages/services/services';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RestProvider } from '../providers/rest/rest';
import { SOCIAL_LINKS, ConstantsProvider,CMS_PAGES } from '../providers/constants/constants';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  isLogin:boolean;
  socialLinks: any;

  bundlePagesData : {data : any};

  pages: Array<{title: string, icon: any, page: any}>;
  cmsPages : Array<{id: any, name: '', alias: '', page: any}>;
  loginPage : Array<{title: string, icon: string, page: string}>; 

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public rest: RestProvider,
    public constantProvider: ConstantsProvider,
    public storage: Storage,
    public loadingController: LoadingController) {
    this.initializeApp();
    this.pages = [
    {title: 'Home', icon: 'home', page: HomePage},
    {title: 'Today In Bali', icon: 'today_in_bali', page: InBaliPage},
    {title: 'FAQ', icon: 'faq', page: FaqPage},
    {title: 'Our Services', icon: 'our_services', page: ServicesPage},
    {title: 'Buy Travel Pass', icon: 'buy_travel_pass', page: BuyTravelPassPage},
    {title: 'Contact Us', icon: 'contact_us', page: ContactUsPage},
    ];

    this.getCMSPages();
    this.getSocialLinks()

    this.loginPage = [{title: constantProvider.loginTitle, icon: 'log_in', page: 'LoginPage'}];
    this.checkForLogin()
  }

  checkForLogin() {
    this.storage.get('is_login').then((isLogin) => {
      if (isLogin) {
        this.constantProvider.isLogin = true  

        this.storage.get('user_data').then((userData) => {
          this.constantProvider.loginTitle = "Dashboard"
          this.constantProvider.loginPage = DashboardPage
        })

        this.storage.get('auth_token').then((token) => {
          this.constantProvider.authToken = token
        })
      }
    })   
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
      }
      );
  }

  getSocialLinks() {

    this.rest.getSocialLink()
    .subscribe(
      responseData => this.socialLinks = responseData,
      err => console.log(err),
      () => {
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
      this.nav.setRoot(AboutUsPage, {'data': JSON.stringify(page), isPushed: false})
    }else {
      this.nav.setRoot(page.page)
    }
  } 

  moveToLoginPage() {
    this.storage.remove('user_data');
    this.storage.remove('auth_token');
    this.storage.set('is_login', false);

    this.constantProvider.loginTitle = 'LOGIN';
    this.constantProvider.loginPage = 'LoginPage'
    this.storage.get('is_login').then((is_login)=> { 
    this.constantProvider.isLogin = is_login
    });

    this.nav.setRoot('LoginPage')
  }

  logoutPressed() {
    this.storage.get('is_login').then((is_login)=> { 

      if ( is_login){
        let requestBundle = {user_id:'', token: ''}
        this.storage.get('user_data').then((user_data) => {
          requestBundle.user_id = JSON.parse(user_data).id;
          this.storage.get('auth_token').then((authToken) => {
            requestBundle.token = authToken;
            this.logoutUser(requestBundle)
          });
        });
      }
      else {
        this.constantProvider.loginTitle = 'LOGIN';
        this.constantProvider.loginPage = 'LoginPage'
        this.constantProvider.isLogin = is_login
        this.moveToLoginPage()
      }    
    })

  }


  logoutUser(requestBundle) {
    let loader = this.loadingController.create({
      content: "Logging Out ..."
    });

    loader.present();

    this.rest.logoutRequest(requestBundle)
    .subscribe(
      responseData =>{},
      err => this.rest.alertServerError(err,loader),
      () => { 
        loader.dismiss()
        this.moveToLoginPage()
      })
  }
}
