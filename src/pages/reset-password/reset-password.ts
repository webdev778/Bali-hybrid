import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, AlertController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-reset-password',
	templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

 	resetPasswordBundle = { password:'', confirmPassword: ''}
 	submittedPassword = false
 	passwordMatched = true
 	data
 	id
 	resetcode

 	constructor(	
        public navCtrl: NavController, 
        public navParams: NavParams,
        public rest: RestProvider,
        public loadingController: LoadingController,
        public alertController: AlertController
        )  {

 		let passedData = this.navParams.get('data');
        this.data = passedData

        var dataReceived = passedData.split('&') 
        var resetcodetemp = dataReceived[0].split('=')
        var idtemp = dataReceived [1].split('=')

        this.resetcode = resetcodetemp[1]
        this.id = idtemp[1]
        this.checkLinkValidity()
 	}

    checkLinkValidity() {
        let loader = this.loadingController.create({
            content: "Resetting Password..."
        });

        loader.present()

        let passInfo = {
            user_id: this.id,
            resetcode: this.resetcode
        }

        console.log(passInfo)

        this.rest.checkForgetPassword(passInfo)
        .subscribe(
            responseData => this.checkLinkStatus(responseData),
            err => this.rest.alertServerError(err,loader),
            () => {
                loader.dismiss()
            }
            );
    }

    checkLinkStatus(bundle) {
        if(bundle.status != 200) {
            this.presentAlert(bundle.api_message)
        }
    }




 	buttonResetPasswordPressed(form: NgForm){
		this.submittedPassword = true
		if (this.resetPasswordBundle.password == this.resetPasswordBundle.confirmPassword) {
			this.passwordMatched = true

			this.sendResetRequest()

			if (form.valid) {
				this.submittedPassword = false
				
			}

		}else {
			this.passwordMatched = false

		}
	}

	sendResetRequest() {
        let loader = this.loadingController.create({
            content: "Resetting Password..."
        });

        loader.present()

        let passInfo = {
            user_id: this.id,
            password: this.resetPasswordBundle.password,
            resetcode: this.resetcode,
            confirm_password: this.resetPasswordBundle.confirmPassword
        }

        this.rest.sendChangePassWord(passInfo)
        .subscribe(
            responseData => this.checkStatus(responseData),
            err => this.rest.alertServerError(err,loader),
            () => {
                loader.dismiss()

            }
            );
    }

    checkStatus(bundle) {
        this.presentAlert(bundle.api_message)
    }

    presentAlert(message) {
        let alert = this.alertController.create({
            title: '',

            subTitle: message,
            buttons: [
            {
                text : 'Okay',
                handler: () => {
                    this.navCtrl.setRoot('LoginPage')
                }
            }
            ]

        });
        alert.present()
    }
}
