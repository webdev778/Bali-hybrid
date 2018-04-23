import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DashboardTicketsPage } from '../dashboard-tickets/dashboard-tickets'

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

     constructor(	public navCtrl: NavController, public navParams: NavParams) {
         this.dashoboardSubPages = [
         {name: 'View Tickets', icon: '', page: DashboardTicketsPage},
         {name: 'View Order History', icon: '', page: DashboardTicketsPage},
         {name: 'View Profile', icon: '', page: DashboardTicketsPage},
         ];
     }

     moveToPage(dashboardSubPage) {
         this.navCtrl.push(dashboardSubPage.page)
         
     }

 }


