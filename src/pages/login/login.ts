import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { DashboardPage } from '../dashboard/dashboard';
import { BuyTravelPassPage } from '../buy-travel-pass/buy-travel-pass'
import { Storage } from '@ionic/storage';
import { ConstantsProvider, UserDetailsDS } from '../../providers/constants/constants'
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
declare const gapi: any;

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public googleAuthentication: any;

    statusForView = 0

    loginData = { email: '', password: '' };
    signupData = {first_name: '',last_name: '', phone: '', email: '',
    password: '', confirm_password: '',gender: ''};
    submittedLogin = false;
    submittedSignup = false;
    isLogIn = false

    emailForgetPassword = ""
    sendForgetPassword = false

    headerText = 'ACCOUNT LOGIN';

    loginBundle = { data:'', user_data: {}, status:'', api_message : ''}
    socialLoginData = { email : '', first_name : '', last_name : '',fb_id : '', gmail_id: ''}

    userBundle = <UserDetailsDS> {}
    loginErrorMessaage = ''
    signUpErrorMessage = ''

    constructor(	
        public navCtrl: NavController,
        public navParams: NavParams, 
        public rest: RestProvider,
        public loadingController: LoadingController, 
        private alertCtrl: AlertController,
        private storage: Storage,
        private constantProvider: ConstantsProvider,
        private fb: FacebookService
    ) {

        this.checkForLogin()
    }

    ionViewDidEnter() {
        this.googleInit()
    }

    googleInit() {
        gapi.load('auth2', () => {
            this.googleAuthentication = gapi.auth2.init({
                client_id: '629202376386-662rfot4r6gnh7j2uhd0r0bl82ri2g5j.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
            this.attachSignin(document.getElementById('googleBtn'));
        });
    }

    attachSignin(element) {
        this.googleAuthentication.attachClickHandler(element, {},
            (googleUser) => {
                let profile = googleUser.getBasicProfile();  
                this.socialLoginData.gmail_id =  profile.getId()
                this.socialLoginData.email = profile.getEmail()
                let name = profile.getName().split(' ')
                this.socialLoginData.first_name = name[0]
                this.socialLoginData.last_name = name[1]
                this.loginSocialUser()
            },              
            (error) => {
            },        
            );
    }

    signInWithGoogle(){
        this.googleInit()              
    }

    signInWithFacebook() {
        let initParams: InitParams = {
            appId: '2091838884425239',
            xfbml: true,
            version: 'v2.8'
        };
        this.fb.init(initParams);
        
        this.fb.login()
        .then((response: LoginResponse) => console.log(response))
        .catch((error: any) => {});     
    }

    checkForLogin() {
        this.storage.get('is_login').then((isLogin) => {
            if (isLogin) {
                this.moveToPage(DashboardPage)
            }
            else {
                 this.storage.remove('user_data');
                 this.storage.remove('auth_token');
                 this.storage.set('is_login', false).then(() => {
                 this.constantProvider.loginTitle = 'LOGIN';
                 this.constantProvider.loginPage = 'LoginPage'
                 this.constantProvider.isLogin = false;
             })
            }
        })
    }

    loginSocialUser() {
        let loader = this.loadingController.create({
            content: "Login ..."
        });

        loader.present();

        this.rest.socialLoginUser(this.socialLoginData)
        .subscribe(
            loginData => this.loginBundle = <{ data:'', user_data: '', status:'', api_message : ''}> loginData,
            err => this.rest.alertServerError(err,loader),
            () => {
                loader.dismiss()
                this.checkStatusForLogin(this.loginBundle)
            }
            );
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
            if (form.valid) {
                this.submittedSignup = false
                this.signupAction(this.signupData)
            }

        }
    }

    signupAction(signup) {

        let loader = this.loadingController.create({
            content: "Signing up ..."
        });

        loader.present();

        this.rest.signupUser(signup)
        .subscribe(
            responseData => this.checkSignUpStatus(responseData),
            err => this.rest.alertServerError(err,loader),
            () => {
                loader.dismiss()
            }
            );
    }

    checkSignUpStatus(response) {
        if(response.status == 200) {
            this.presentAlertSignUp(response.api_message)
        } else {
            this.signUpErrorMessage = response.api_message
        }

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
            err => this.rest.alertServerError(err,loader),
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
            this.constantProvider.authToken = this.loginBundle.data;
            
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
            err => this.rest.alertServerError(err,loader),
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

    presentAlertSignUp(message) {
        let alert = this.alertCtrl.create({
            title: '',
            subTitle: message,
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
    
    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

}
