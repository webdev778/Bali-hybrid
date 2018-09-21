import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

    dashoboardSubPages: Array<{name: string, icon: any, page: any, image_name:any}>;

    constructor(	public navCtrl: NavController, public navParams: NavParams, 
        private storage: Storage,private constantProvider: ConstantsProvider) {
        this.dashoboardSubPages = [
                                    {
                                        name: 'View Tickets', icon: '', 
                                        page: 'DashboardTicketsPage', 
                                        image_name:'assets/imgs/tickets.png'
                                    },

                                    {
                                        name: 'View Orders', icon: '', 
                                        page: 'OrderHistoryPage',
                                        image_name:'assets/imgs/order-history.png' 
                                    },

                                    {
                                        name: 'View Profile', 
                                        icon: '', 
                                        page: 'ViewProfilePage',
                                        image_name:'assets/imgs/view-profile.png'
                                    },
                                    
                                  ];

        this.checkForLogin()
    }

    checkForLogin() {
        this.storage.get('is_login').then((isLogin) => {
            if (!isLogin) {
                this.moveToLoginPage()
            }
            else {
                this.storage.set('is_login', true);
                this.constantProvider.loginTitle = "Dashboard"
                this.constantProvider.loginPage = 'Dashboard'
                this.constantProvider.isLogin = true
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
        this.constantProvider.isLogin = false;

        this.navCtrl.setRoot('LoginPage')
    }
}


