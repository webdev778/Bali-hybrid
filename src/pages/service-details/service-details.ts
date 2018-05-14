import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';



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

     bundleData:any
     serviceDetails = {image_name: '',title: '', description: ''};
     passedData 

     constructor(	public navCtrl: NavController, 
                    public navParams: NavParams,
                    public loadingController: LoadingController,
                    public rest: RestProvider,) {

          this.passedData = JSON.parse(this.navParams.get('service'))
         // this.serviceDetails.title = passedData.title
         // this.serviceDetails.description = passedData.description
         // this.serviceDetails.image_name = passedData.image_name
     }

     ionViewDidLoad() {
         this.getServiceFromServer() 
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
  

     buttonBackPressed() {
         this.navCtrl.pop();
     }

 }
