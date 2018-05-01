import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, AlertController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ConstantsProvider } from '../../providers/constants/constants'
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-activation',
    templateUrl: 'activation.html',
})

export class ActivationPage {
	data
	user_id
	signupcode

	constructor(	
        public navCtrl: NavController, 
        public navParams: NavParams,
        public rest: RestProvider,
        private constantProvider: ConstantsProvider,
        public loadingController: LoadingController,
        public alertController: AlertController
        ) {

        let passedData = this.navParams.get('data');
        this.data = passedData

        var dataReceived = passedData.split('&') 
        var signUpCode = dataReceived[0].split('=')
        var loginCode = dataReceived [1].split('=')

        this.signupcode = signUpCode[1]
        this.user_id = loginCode[1]

        console.log("signupcode "+ this.signupcode)
        console.log("user_id" + this.user_id)

        this.sendAuthenticationRequest()
    }

    sendAuthenticationRequest() {
        let loader = this.loadingController.create({
            content: "Fetching Tickets ..."
        });

        loader.present()

        let passInfo = {
            user_id: this.user_id,
            signupcode: this.signupcode
        }

        this.rest.sendAuthRequest(passInfo)
        .subscribe(
            responseData => this.checkStatus(responseData),
            err => console.log(err),
            () => {
                loader.dismiss()

            }
            );
    }

    checkStatus(bundle) {
        console.log(bundle)
        this.presentAlertSignUpSuccessful(bundle.api_message)
    }

    presentAlertSignUpSuccessful(message) {
        let alert = this.alertController.create({
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
}