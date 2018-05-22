import { Injectable } from '@angular/core';

import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { InBaliPage } from '../in-bali/in-bali';
import { FaqPage } from '../faq/faq';
import { AboutUsPage } from '../about-us/about-us';
import { ServicesPage } from '../services/services';
import { BuyTravelPassPage } from '../buy-travel-pass/buy-travel-pass';
import { ContactUsPage } from '../contact-us/contact-us';
import { CMS_PAGES, ConstantsProvider } from '../../providers/constants/constants'

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

 @Input() header;

 bundlePagesData : {data : any};
 isLogin = false

 pages: Array<{title: string, icon: any, page: any}>;
 cmsPages : Array<{id: any, name: '', alias: '', page: any}>;
 loginPage : Array<{title: string, icon: string, page: string}>; 

 constructor(  public navCtrl: NavController, 
     public navParams: NavParams, 
     public rest: RestProvider, 
     public loadingController: LoadingController, 
     public constantProvider: ConstantsProvider,
     private storage: Storage,
     ) {

     this.getCMSPages()

     this.pages = [
     {title: 'Home', icon: 'home', page: HomePage},
     {title: 'Today In Bali', icon: 'today_in_bali', page: InBaliPage},
     {title: 'FAQ', icon: 'faq', page: FaqPage},
     {title: 'Our Services', icon: 'our_services', page: ServicesPage},
     {title: 'Buy Travel Pass', icon: 'buy_travel_pass', page: BuyTravelPassPage},
     {title: 'Contact Us', icon: 'contact_us', page: ContactUsPage},
     ];

     this.loginPage = [{title: constantProvider.loginTitle, icon: 'log_in', page: constantProvider.loginPage}];
     
 }

     getCMSPages() {
         this.cmsPages = CMS_PAGES;
     }

     openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.page == undefined) {
        this.navCtrl.setRoot(AboutUsPage, {'data': JSON.stringify(page.id), isPushed: false})
    }else {
      // if (page.page == BuyTravelPassPage){
      //   this.checkForLogin(page)
      // }else{
          this.navCtrl.setRoot(page.page)
      // }
      
      }
    }

    checkForLogin(page) {
    this.storage.get('is_login').then((isLogin) => {
        if (!isLogin) {
            this.moveToLoginPage()
        }
        else{
            this.navCtrl.setRoot(page.page)
        }
    })
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

        this.navCtrl.setRoot('LoginPage')
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
          


    // presentAlertNotLoggedIn(){
    // let alert = this.alertCtrl.create({
    //     title: 'Not Logged In',

    //     subTitle: 'Please login to purchase travel pass',
    //     buttons: [
    //     {
    //         text : 'Ok',
    //     }
    //     ]

    // });
    // alert.present();
    // }

}
