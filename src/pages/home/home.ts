import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {ServiceDetailsPage} from '../service-details/service-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bundleData : {data : any};
	bundleServices : any[] = [];
  textSupport = "We provide Australians travelling to Bali, support 24 hours a day, 7 Days a week. Lost Passport - Lost / Delayed Luggage - Medical Assistance ( Doctor, Dentist, Hospital )EMERGENCY Money - Lost Medication ( URGENTLY required within 12 - 24 hours) Lost / Stolen personal items - Money, Credit Cards, Wallet, Purse, Mobile phone, etc."
  medicalAssistancePage = {   created_at: '' ,
                            deleted_at:'',
                            description:'',
                            id:null, 
                            image_name:'assets/imgs/medical-img.jpg', 
                            is_paid:'', 
                            status:'',
                            title:'Medical Assistance', updated_at:''
                          } 
 
  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                public rest: RestProvider, 
                public loadingController: LoadingController) {
    
  }

  ionViewDidLoad() {
    this.getServicesList()
  }

  getServicesList() {
  	this.rest.getServices()
         .subscribe(
            responseData => this.bundleData = <{data : any}> responseData,
            err => console.log(),
            () => {
              this.bundleServices = <any[]> this.bundleData.data;
              this.bundleServices.push(this.medicalAssistancePage)
            }
           );
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
}
