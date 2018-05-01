import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  page: {id:'', name:'', alias: ''};

	bundleDetails: {data: any};
  pageContents : any[];
  isPushed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    this.page = JSON.parse(this.navParams.get('data'))
    this.isPushed = this.navParams.get('isPushed')
    this.getPageContent(this.page);
  }

  ionViewDidLoad() {
    
  }

  buttonBackPressed() {
    if (this.isPushed) {
      this.navCtrl.pop();
    }
  }

  getPageContent(page) {
  	this.rest.getPageContent(page)
         .subscribe(
            responseData => this.bundleDetails = <{data: any}> responseData,
            err => console.log(err),
            () => {
              this.pageContents = this.bundleDetails.data;
            }
           );
  }

}
