import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardTicketsPage } from '../dashboard-tickets/dashboard-tickets'
import { OrderHistoryPage } from '../order-history/order-history'
import { ViewProfilePage } from '../view-profile/view-profile'
import { Storage } from '@ionic/storage';
import { ConstantsProvider } from '../../providers/constants/constants'

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
     selector: 'page-dashboard',
     templateUrl: 'dashboard.html',
 })
 export class DashboardPage {
     
     dashoboardSubPages: Array<{name: string, icon: any, page: any}>;

     constructor(	public navCtrl: NavController, public navParams: NavParams, 
         private storage: Storage,private constantProvider: ConstantsProvider) {
         this.dashoboardSubPages = [
                                         {name: 'View Tickets', icon: '', page: DashboardTicketsPage},
                                         {name: 'View Order History', icon: '', page: OrderHistoryPage},
                                         {name: 'View Profile', icon: '', page: ViewProfilePage},
                                    ];

         this.checkForLogin()
     }

     checkForLogin() {
         this.storage.get('is_login').then((isLogin) => {
             if (!isLogin) {
                 this.moveToLoginPage()
             }
         })
     }

     moveToPage(dashboardSubPage) {
         this.navCtrl.push(dashboardSubPage.page)
         
     }

     moveToLoginPage() {
         this.storage.remove('user_data');
         this.storage.remove('auth_token');
         this.storage.set('is_login', false);

         this.constantProvider.loginTitle = 'LOGIN';
         this.constantProvider.loginPage = 'LoginPage'

         this.navCtrl.setRoot('LoginPage')
     }

     buttonLogoutPressed() {
         this.moveToLoginPage()
     }


 }


