import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CMS_PAGES } from '../../providers/constants/constants'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pages: Array<{title: string, icon: any, page: any}>;
  cmsPages : Array<{id: any, name: '', alias: '', page: any}>;
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
    this.pages =   [
        {title: 'FAQ', icon: 'faq', page: 'FaqPage'},
        {title: 'Buy Support', icon: 'buy_travel_pass', page: 'BuyTravelPassPage'},
        {title: 'Contact Us', icon: 'contact_us', page: 'ContactUsPage'},
    ];
    
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
      this.navCtrl.push('ServiceDetailsPage', {
        'service': JSON.stringify(service.id),
      })
    }else {
      this.navCtrl.push('MedicalAssistancePage')
    }
  }

  getCMSPages() {
    this.cmsPages = CMS_PAGES;
  }

  openPage(page) {
    if (page.page == undefined) {
        this.navCtrl.setRoot('AboutUsPage', {'data': JSON.stringify(page.id), isPushed: false})
    }else {
          this.navCtrl.setRoot(page.page)
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
