import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ServiceDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
     selector: 'page-service-details',
     templateUrl: 'service-details.html',
 })
 export class ServiceDetailsPage {

    pages: Array<{title: string, icon: any, id: any}>;
     bundleData:any
     bundleIsPurchased:any
     serviceDetails = {image_name: '',title: '', description: ''};
     requestBundle = {user_id:'',token:''}
     helpButtonStatus = false
     passedData



     constructor(	public navCtrl: NavController, 
                    public navParams: NavParams,
                    public loadingController: LoadingController,
                    public rest: RestProvider,
                    private storage: Storage,) {

        this.pages =   [
            {title: 'Medical', icon: 'medical', id: null},
            {title: 'Lost Passport', icon: 'lost_passport', id: 3},
            {title: 'Money', icon: 'money', id: 5},
        ];
          this.passedData = JSON.parse(this.navParams.get('service'))
          this.checkForLogin()
     }

     ionViewDidLoad() {
         this.getServiceFromServer()

     }

     checkForLogin() {
           this.storage.get('is_login').then((isLogin) => {
            if (!isLogin) {
                this.helpButtonStatus = false
            }
            else {
                this.storage.get('user_data').then((user_data) => {
                    this.requestBundle.user_id = JSON.parse(user_data).id;
                    this.storage.get('auth_token').then((authToken) => {
                        this.requestBundle.token = authToken;
                        this.checkBuyTravelPassPurchasedStatus()  
                    });
                });
            }
        })
     }

     checkBuyTravelPassPurchasedStatus() {
         let loader = this.loadingController.create({
            content: "Loading Services ..."
        });

        this.rest.checkPurchaseStatus(this.requestBundle)
        .subscribe(
            responseData => this.bundleIsPurchased = responseData, 
            err => this.rest.alertServerError(err,loader),
            () => {
                this.helpButtonStatus = this.bundleIsPurchased.data
            }
        )
     }

     getServiceFromServer() {
         let service_id = this.passedData

         let loader = this.loadingController.create({
            content: "Loading Services ..."
        });
        loader.present()

        this.rest.requestServices(service_id)
        .subscribe(
            responseData => this.bundleData = <{data : any}> responseData, 
            err => this.rest.alertServerError(err,loader),
            () => {
                this.serviceDetails.title = this.bundleData.data.title
                this.serviceDetails.description = this.bundleData.data.description   
                this.serviceDetails.image_name = this.bundleData.data.image_name      
                loader.dismiss()
            }
            )
     }

     buttonHelpPressed() {
         if (this.helpButtonStatus == false) {
             return
         }else {
             let sendingInfo = [this.passedData,this.serviceDetails.title]
             this.navCtrl.push('HelpDeskPage',{'id':JSON.stringify(sendingInfo)})
         }
     }
  
     buttonBackPressed() {
         this.navCtrl.pop();
     }

     moveToServiceDetails(service) {
        if(service.id != this.passedData) {
              this.navCtrl.push('ServiceDetailsPage', {
            'service': JSON.stringify(service.id),
          })
        }
        if(service.id == null)
        {
          this.navCtrl.push('MedicalAssistancePage')
        }
    }

    openService() {
    this.navCtrl.setRoot('MedicalAssistancePage')
    }

    openToday() {
    this.navCtrl.setRoot('InBaliPage')
    }

    openFavourites() {
        this.navCtrl.setRoot('FavouritesPage')
    }

    openMe() {
    this.navCtrl.setRoot('AccountPage')
    }
 }
