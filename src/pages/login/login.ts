import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  isLogIn = false;
  selectLogin = true;

	loginData = { email: '', password: '' };
	signupData = {first_name: '',last_name: '', username: '', phone: '', email: '', password: '', confirm_password: '',gender: ''};
	submittedLogin = false;
	submittedSignup = false;
	passwordMatched = false;

  headerText = 'ACCOUNT LOGIN';

  loginBundle = { data:'', user_data: {}, status:'', api_message : ''}
  userBundle = { "id": '', "first_name": "", "last_name": "","username": "","email": "","status": '',"phone": "","gender": '', "created_at": '', "updated_at": '', "deleted_at": '' }

  constructor(	public navCtrl: NavController,
				public navParams: NavParams, 
				public rest: RestProvider,
				public loadingController: LoadingController, 
        private alertCtrl: AlertController,
        private storage: Storage,) 
  {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createAccountPressed() {
    this.selectLogin = false;
    this.headerText = 'ACCOUNT SIGNUP';
  }

  setLoginPressed() {
    this.selectLogin = true;
    this.headerText = 'ACCOUNT LOGIN';
  }

	buttonSignupPressed(form: NgForm) {
		this.submittedSignup = true

		if (this.signupData.password == this.signupData.confirm_password) {
			this.passwordMatched = true

			if (form.valid) {
				this.submittedSignup = false
				this.signupAction(this.signupData)
			}

		}else {
			this.passwordMatched = false
			console.log('password word does not matched')
			console.log(this.signupData.password, "!=", this.signupData.confirm_password)
		}
	}

	signupAction(signup) {

    	let loader = this.loadingController.create({
        content: "Sign up ..."
      });

      loader.present();

      this.rest.signupUser(signup)
         .subscribe(
           	loginData => loginData,
           	err => loader.dismiss(),
           	() => {
           		loader.dismiss()
           	}
           );
    }

	buttonLoginPressed(form: NgForm) {

		this.submittedLogin = true

		if (form.valid) {
			this.submittedLogin = false
			this.loginAction(this.loginData)
		}
	}

    loginAction(login) {

    	let loader = this.loadingController.create({
        	content: "Login ..."
     	 });

      loader.present();

      this.rest.loginUser(login)
         .subscribe(
           	loginData => this.loginBundle = <{ data:'', user_data: '', status:'', api_message : ''}> loginData,
           	err => loader.dismiss(),
           	() => {
           		loader.dismiss()
               console.log(this.loginBundle)
               this.checkStatus(this.loginBundle)
           	}
           );
    }

    checkStatus(bundle) {
      if (bundle.status == 200) {
        this.userBundle =  <{ "id": '', "first_name": "", "last_name": "","username": "","email": "","status": '',"phone": "","gender": '', "created_at": '', "updated_at": '', "deleted_at": '' }> this.loginBundle.user_data
        this.storage.set('user_data', this.userBundle);
        this.storage.set('auth_token', this.loginBundle.data);

        this.isLogIn = true

      }else {
        this.presentAlert(bundle.api_message)
      }

    }

    presentAlert(message) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }

}
