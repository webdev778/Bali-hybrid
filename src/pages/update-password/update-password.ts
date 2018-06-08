import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NgForm } from '@angular/forms';;
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UpdatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {
	
    updatePasswordBundle = { oldPassword:'', newPassword: '', confirmNewPassword:''}
    requestBundle = {user_id: '', token: ''}

 	submittedPassword = false
 	
 	constructor(	
        public navCtrl: NavController, 
        public navParams: NavParams,
        public rest: RestProvider,
        public loadingController: LoadingController,
        public alertController: AlertController,
        private storage: Storage,
        )  {
 	}

 	buttonUpdatePasswordPressed(form: NgForm){
		this.submittedPassword = true
		if ((this.updatePasswordBundle.newPassword == this.updatePasswordBundle.confirmNewPassword) && 
            (this.updatePasswordBundle.oldPassword != '') && 
            (this.updatePasswordBundle.newPassword != '') && 
            (this.updatePasswordBundle.confirmNewPassword != '')) {
          		
                this.submittedPassword = false
                this.updateUserPassword()						
		}
	}

     ionViewWillEnter() {
        this.checkForLogin()
    }

    checkForLogin() {
        this.storage.get('is_login').then((isLogin) => {
            if (!isLogin) {
                this.moveToLoginPage()
            }
            else{
                this.storage.get('user_data').then((user_data) => {
                    this.requestBundle.user_id = JSON.parse(user_data).id;
                    this.storage.get('auth_token').then((authToken) => {
                        this.requestBundle.token = authToken;
                    });
                });
            }
        })
    }

    moveToLoginPage() {
       this.navCtrl.setRoot('Dashboard')
    }

    updateUserPassword() {
        let loader = this.loadingController.create({
            content: "Requesting to change password ..."
        });

        loader.present()

        let requestBundle = {
            user_id: this.requestBundle.user_id,
            token: this.requestBundle.token,
            oldpassword: this.updatePasswordBundle.oldPassword,
            newpassword:this.updatePasswordBundle.newPassword,
            confirmnewpassword:this.updatePasswordBundle.confirmNewPassword
        }

        this.rest.updatePassword(requestBundle)
        .subscribe(
            responseData =>this.checkResponse(responseData),
            err => this.rest.alertServerError(err,loader),
            () => {  
                loader.dismiss()    
            })
    }

    checkResponse(response) {
        this.presentAlertPasswordChanged(response.api_message)
    }

    presentAlertPasswordChanged(message) {
        let alert = this.alertController.create({
            title: '',

            subTitle: message,
            buttons: [
            {
                text : 'Okay',
                handler: () => {
                    this.moveToLoginPage()
                }
            }
            ]

        });
        alert.present()
    }

    
    buttonBackPressed() {
        this.navCtrl.pop();
    }
}
