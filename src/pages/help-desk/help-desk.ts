import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { NgForm } from '@angular/forms';
/**
* Generated class for the HelpDeskPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-help-desk',
	templateUrl: 'help-desk.html',
})
export class HelpDeskPage {
	submittedDescription = false
	requestBundle =  {user_id:'',token:''}
	responseBundle = {user_id:'',token:'',id:'',title:'',message:''}
	urlData = ''
	bundleResponseFromServer:any
	bundleIsPurchased:any
	helpButtonStatus = false

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		private storage: Storage,
		public loadingController: LoadingController,
		public rest: RestProvider,
		private alertCtrl: AlertController,
		) {

		this.urlData = JSON.parse(this.navParams.get('id'))
		this.responseBundle.id = this.urlData[0]
		this.responseBundle.title = this.urlData[1]
		
	}

	ionViewDidLoad() {
		this.checkForLogin()
	}

	checkForLogin() {
		this.storage.get('is_login').then((isLogin) => {
			if (!isLogin) {
				this.navCtrl.setRoot('LoginPage')			
			}else{
				    this.storage.get('user_data').then((user_data) => {
						this.responseBundle.user_id = JSON.parse(user_data).id;
						this.storage.get('auth_token').then((authToken) => {
							this.responseBundle.token = authToken;	
							this.checkBuyTravelPassPurchasedStatus() 
						});
					});
			}						
		})
	}


	checkBuyTravelPassPurchasedStatus() {
		let loader = this.loadingController.create({
			content: "checking ..."
		});

		this.requestBundle.user_id = this.responseBundle.user_id
		this.requestBundle.token = this.responseBundle.token

		this.rest.checkPurchaseStatus(this.requestBundle)
		.subscribe(
			responseData => this.bundleIsPurchased = responseData, 
			err => this.rest.alertServerError(err,loader),
			() => {
				this.helpButtonStatus = this.bundleIsPurchased.data
				if (!this.helpButtonStatus) {
					this.navCtrl.setRoot('ServicesPage')
				}
			})
	}

	buttonSendPressed(form:NgForm) {
		this.submittedDescription = true
		if (form.valid) {
			this.submittedDescription = false
			this.raiseHelpRequest()	
		}
	}

	buttonBackPressed() {
		this.navCtrl.pop();
	}

	raiseHelpRequest() {
		let loader = this.loadingController.create({
			content: "sending query ..."
		});
		loader.present()
		this.rest.requestHelp(this.responseBundle)
		.subscribe(
			responseData => this.bundleResponseFromServer = responseData, 
			err => this.rest.alertServerError(err,loader),
			() => {
				loader.dismiss()
				this.presentAlertHelpResponse(this.bundleResponseFromServer.api_message)
			}
			)

	}	

	presentAlertHelpResponse(message) {
		let alert = this.alertCtrl.create({
			title: '',
			subTitle: message,
			buttons: [
			{
				text : 'Okay',
				handler: () => {
					this.responseBundle.message = ''
				}
			}
			]
		});
		alert.present()
	}	

}
