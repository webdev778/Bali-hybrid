import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import {ServiceDetailsPage} from '../service-details/service-details';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

	bundleData : {data : any};
	bundleServices : any[] = [];
  isListLoaded = false

  medicalAssistancePage = {   created_at: '' ,
                              deleted_at:'',
                              description:'',
                              id:null, 
                              image_name:'assets/imgs/medical-img.jpg', 
                              is_paid:'', 
                              status:'',
                              title:'Medical Assistance', updated_at:''
                          } 
 

 


  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams, 
  				public rest: RestProvider,
          public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.getServicesList()
  }

  moveToServiceDetails(service) {
    if(service.id != null) {
  		this.navCtrl.push(ServiceDetailsPage, {
        'service': JSON.stringify(service.id),
      })
    }else {
      this.navCtrl.push('MedicalAssistancePage')
    }
 	}

  getServicesList() {

    let loader = this.loadingController.create({
          content: "Loading ..."
    });

    // loader.present()

  	this.rest.getServices()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => loader.dismiss(),
            () => {
              loader.dismiss()
              this.isListLoaded = true
              this.bundleServices = <any[]> this.bundleData.data;
              this.bundleServices.push(this.medicalAssistancePage)
              
            }
           );
  }


}
