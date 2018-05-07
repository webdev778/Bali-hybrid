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
 	isListLoaded = false
 	
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
			content: "fetching orders ..."
		});
		loader.present()

		this.rest.requestOrderHistory(this.requestBundle)
		.subscribe(
			responseData => this.bundleData = <{data : any}> responseData, 
			err => this.rest.alertServerError(loader),
			() => {		
						loader.dismiss(),
						this.bundleOrderDescription = <any[]> this.bundleData.data;
						this.bundleOrderList = []
						this.isListLoaded = true
						
						for(let order of this.bundleOrderDescription) { 
							var tktInfo = ''
							let ticketInfo = order.ticket_info

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

							let dateTime = (order.order_date.date.split('.'))[0]
							dateTime = dateTime + " " + order.order_date.timezone

							this.bundleOrderList.push(<OrderHistoryStructure> {
																				order_id: order.order_id,
																				order_no: order.order_no,
																			    user_id: order.user_id,
																			    amount: order.amount,
																			    name: order.name,
																			    transaction_id: order.transaction_id,
																			    order_date: dateTime,
																			    ticket_info : tktInfo,
																			    is_open : true
																				})
						}

						console.log(this.bundleOrderList)

				}
		)
	}

	toggleSection(order) {
		order.is_open = !order.is_open
	}

	buttonBackPressed() {
		this.navCtrl.pop();
	}

}
