import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard'

/**
 * Generated class for the PaymentStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-payment-status',
    templateUrl: 'payment-status.html',
})
export class PaymentStatusPage {

    orderDetails: {order_no: '' ,transaction_id: ''}

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.orderDetails = JSON.parse(navParams.get('order-details'))
    }

    moveToDashboard(){
        this.navCtrl.push(DashboardPage)
    }
}
