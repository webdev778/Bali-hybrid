import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ConstantsProvider } from '../../providers/constants/constants';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-view-profile',
	templateUrl: 'view-profile.html',
})
export class ViewProfilePage {
	requestBundle = {user_id: '', token: ''}
	bundleData : {data : any};
	bundleOrderDescription: any;
	bundleOrder = {first_name: '',last_name: '', username: '', phone: '', email: '', gender: '', 
				   address: '', city:'', zipcode:'' };
	isDisabled = true
	submittedForm = false

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
						this.requestProfileData()  
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

	requestProfileData() {
		let loader = this.loadingController.create({
			content: "Sending ..."
		});

		this.rest.requestUserProfile(this.requestBundle)
		.subscribe(
			responseData => this.bundleData = <{data : any}> responseData, 
			err => loader.dismiss(),
			() => {
						this.bundleOrderDescription = <any[]> this.bundleData.data;
						this.bundleOrder.first_name = this.bundleOrderDescription.first_name
						this.bundleOrder.last_name = this.bundleOrderDescription.last_name
						this.bundleOrder.email = this.bundleOrderDescription.email
						this.bundleOrder.gender = this.bundleOrderDescription.gender
						this.bundleOrder.phone = this.bundleOrderDescription.phone
				}
		)
	}

	buttonEdit() {
		this.isDisabled = false
	}

	buttonUpdate(form: NgForm) {
		this.submittedForm = true

	    if (form.valid) {
	      this.submittedForm = false
	      this.isDisabled = true  
	    }
	}

	buttonBackPressed() {
		this.navCtrl.pop()
	}

}
