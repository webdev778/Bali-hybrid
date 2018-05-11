import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Content } from 'ionic-angular';
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
    @ViewChild(Content) content: Content;

    scrollToTop() {
        this.content.scrollToTop(700);
    }

    requestBundle = {user_id: '', token: ''}
    bundleData : {data : any};
    bundleOrderDescription: any;
    bundleOrder = {first_name: '',last_name: '', username: '', phone: '', email: '', gender: '', 
    address: '', city:'', zip_code:'' };
    profileText = ''
    profileErrorText = ''
    
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
            content: "Loading Profile ..."
        });
        loader.present()

        this.rest.requestUserProfile(this.requestBundle)
        .subscribe(
            responseData => this.bundleData = <{data : any}> responseData, 
            err => this.rest.alertServerError(err,loader),
            () => {
                this.bundleOrderDescription = <any[]> this.bundleData.data;
                this.bundleOrder.first_name = this.bundleOrderDescription.first_name
                this.bundleOrder.last_name = this.bundleOrderDescription.last_name
                this.bundleOrder.email = this.bundleOrderDescription.email
                this.bundleOrder.gender = this.bundleOrderDescription.gender
                this.bundleOrder.phone = this.bundleOrderDescription.phone
                this.bundleOrder.city = this.bundleOrderDescription.city
                this.bundleOrder.address = this.bundleOrderDescription.address
                this.bundleOrder.zip_code = this.bundleOrderDescription.zip_code
                loader.dismiss()
            }
            )
    }

    buttonEdit() {
        this.isDisabled = false
        this.profileText = ''
        this.profileErrorText = ''
    }

    buttonUpdate(form: NgForm) {
        this.submittedForm = true
        if (form.valid) {   
            this.submittedForm = false
            this.updateProfileData()  
            
        }
    }

    updateProfileData() {
        let loader = this.loadingController.create({
            content: "Sending ..."
        });

        loader.present()
        
        let passInfo = {
            user_id:this.requestBundle.user_id,
            token: this.requestBundle.token,
            first_name: this.bundleOrder.first_name,
            last_name: this.bundleOrder.last_name, 
            username: this.bundleOrder.username, 
            phone: this.bundleOrder.phone, 
            email: this.bundleOrder.email, 
            gender: this.bundleOrder.gender, 
            address: this.bundleOrder.address,
            city:this.bundleOrder.city,
            zip_code: this.bundleOrder.zip_code
        }
        
        this.rest.updateProfileRecord(passInfo)
        .subscribe(
            responseData => this.checkStatus(responseData),
            err => this.rest.alertServerError(err,loader),
            () => {
                loader.dismiss()
            }
            );
    }

    checkStatus(bundle) {
        if (bundle.status == 200) {
            this.isDisabled = true
            this.scrollToTop();
            this.profileText = bundle.api_message
        }else {
            this.scrollToTop();
            this.profileErrorText = bundle.api_message
        }

    }

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    buttonBackPressed() {
        this.navCtrl.pop()
    } 
}
