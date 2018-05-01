import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ConstantsProvider, OrderHistoryStructure } from '../../providers/constants/constants';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

	requestBundle = {user_id: '', token: ''}
	bundleData : {data : any};
 	bundleOrderDescription: any[] = [];
 	bundleOrderList: Array<OrderHistoryStructure> = []

	constructor( 	
		public navCtrl: NavController, 
		public navParams: NavParams,
		public rest: RestProvider,
		private storage: Storage,
		private constantProvider: ConstantsProvider,
		public loadingController: LoadingController ) {
	}

	ionViewWillEnter(){
		this.checkForLogin()
	}

	checkForLogin() {
		this.storage.get('is_login').then((isLogin) => {
			if (!isLogin) {
				this.moveToLoginPage()
			}
			else {
				this.storage.get('user_data').then((user_data) => {
					this.requestBundle.user_id = JSON.parse(user_data).id;
					this.storage.get('auth_token').then((authToken) => {
						this.requestBundle.token = authToken;
						this.requestOrderList()  
					});
				});
			}
		})
	}

	moveToLoginPage() {
		this.storage.remove('user_data');
		this.storage.remove('auth_token');
		this.storage.set('is_login', false);

		this.constantProvider.loginTitle = 'LOGIN';
		this.constantProvider.loginPage = 'LoginPage'

		this.navCtrl.setRoot('LoginPage')
	}

	requestOrderList() {
		let loader = this.loadingController.create({
			content: "Sending ..."
		});

		this.rest.requestOrderHistory(this.requestBundle)
		.subscribe(
			responseData => this.bundleData = <{data : any}> responseData, 
			err => loader.dismiss(),
			() => {
						this.bundleOrderDescription = <any[]> this.bundleData.data;
						this.bundleOrderList = []
					

						for (let ticket of this.bundleOrderDescription) { 
							var tktInfo = ''
							let ticketInfo = ticket.ticket_info

							for( let info of ticketInfo ) {
								if (info.travel_passid == 1) {
									tktInfo = tktInfo + info.quantity + "Adults "
								}
								if (info.travel_passid == 2) {
									tktInfo = tktInfo + info.quantity + "Child "
								}
								if (info.travel_passid == 3) {
									tktInfo = tktInfo + info.quantity + "Family "
								}
							}

							this.bundleOrderList.push(<OrderHistoryStructure> {
																				order_id: ticket.order_id,
																				order_no: ticket.order_no,
																			    user_id: ticket.user_id,
																			    amount: ticket.amount,
																			    name: ticket.name,
																			    transaction_id: ticket.transaction_id,
																			    order_date: ticket.order_date,
																			    ticket_info : tktInfo
																				})
						}

						console.log(this.bundleOrderList)
				}
		)
	}

	buttonBackPressed() {
		this.navCtrl.pop();
	}

}
