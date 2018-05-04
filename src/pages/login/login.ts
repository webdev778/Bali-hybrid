import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { DashboardPage } from '../dashboard/dashboard';
import { BuyTravelPassPage } from '../buy-travel-pass/buy-travel-pass'
import { Storage } from '@ionic/storage';

import { ConstantsProvider, UserDetailsDS } from '../../providers/constants/constants'


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

  statusForView = 0

	loginData = { email: '', password: '' };
	signupData = {first_name: '',last_name: '', username: '', phone: '', email: '',
               password: '', confirm_password: '',gender: ''};
	submittedLogin = false;
	submittedSignup = false;
	passwordMatched = false;
  isLogIn = false

  emailForgetPassword = ""
  sendForgetPassword = false

  headerText = 'ACCOUNT LOGIN';

  loginBundle = { data:'', user_data: {}, status:'', api_message : ''}
  userBundle = <UserDetailsDS> {}
  loginErrorMessaage = ''

  constructor(	public navCtrl: NavController,
				public navParams: NavParams, 
				public rest: RestProvider,
				public loadingController: LoadingController, 
        private alertCtrl: AlertController,
        private storage: Storage,
        private constantProvider: ConstantsProvider) 
  {
  	this.checkForLogin()
  }

  checkForLogin() {
    this.storage.get('is_login').then((isLogin) => {
       if (isLogin) {
           this.moveToPage(DashboardPage)
       }
     })
  }

  ionViewDidLoad() {
    
  }

  createAccountPressed() {
    this.statusForView = 2
    this.headerText = 'ACCOUNT SIGNUP';
  }

  setLoginPressed() {
    this.statusForView = 0
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

		}
	}

	signupAction(signup) {

    	let loader = this.loadingController.create({
        content: "Signing up ..."
      });

      loader.present();

      this.rest.signupUser(signup)
         .subscribe(
           	loginData => loginData,
           	err => loader.dismiss(),
           	() => {
           		loader.dismiss()
              this.presentAlertSignUp()
              
           	}
           );
  }

	buttonLoginPressed(form: NgForm) {
		this.submittedLogin = true
    this.loginErrorMessaage = ''

		if (form.valid) {
			this.submittedLogin = false
			this.loginAction(this.loginData)
		}
	}

  moveToPage(page) {
    this.storage.set('is_login', true);
    this.navCtrl.setRoot(page)
    this.constantProvider.loginTitle = "Dashboard"
    this.constantProvider.loginPage = DashboardPage
    this.constantProvider.isLogin = true
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
               this.checkStatusForLogin(this.loginBundle)
           	}
           );
  }

    checkStatusForLogin(bundle) {
      if (bundle.status == 200) {
        this.userBundle =  <UserDetailsDS> this.loginBundle.user_data
        this.storage.set('user_data', JSON.stringify(this.userBundle));
        this.storage.set('auth_token', this.loginBundle.data);
        if (this.navParams.get('lastPage') == 'buyTravelPassPage') {
          this.moveToPage(BuyTravelPassPage)
        }
        else {
          this.moveToPage(DashboardPage)
        }
      }else {
        this.loginErrorMessaage = bundle.api_message
      }

    }

    forgetPasswordClicked(){
      this.statusForView = 1
      this.sendForgetPassword = false
      this.headerText = "RESET PASSWORD"
    }

    sendForgetPasswordClicked(form: NgForm) {

      if (form.valid)
      {
        this.sendForgetPassword = false
        this.sendEmailToForgetPassword()
      }else{
        this.sendForgetPassword = true
      }

      
    }

    sendEmailToForgetPassword()
    {
      let loader = this.loadingController.create({
          content: "Sending ..."
        });

      loader.present();

      this.rest.resetPassord(this.emailForgetPassword)
         .subscribe(
             data => this.presentAlert( <any>data["api_message"]),
             err => loader.dismiss(),
             () => {
               loader.dismiss()
             }
           );
    }

    presentAlert(message) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }

   presentAlertSignUp() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'Registration Successful, please check your mail inbox',
      buttons: [
      {
        text : 'Okay',
        handler: () => {
          this.navCtrl.setRoot(LoginPage)
        }
      }
      ]

    });
    alert.present()
  }

}
