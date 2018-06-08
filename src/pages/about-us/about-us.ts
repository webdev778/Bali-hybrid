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

  pageId
	bundleDetails: {data: any,title:any};
  pageContents : any[];
  isPushed = false;
  pageTitle = ''

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    this.pageId = JSON.parse(this.navParams.get('data'))
    this.isPushed = this.navParams.get('isPushed')
    this.getPageContent(this.pageId);
  }

  buttonBackPressed() {
    if (this.isPushed) {
      this.navCtrl.pop();
    }
  }

  getPageContent(page) {
  	this.rest.getPageContent(this.pageId)
         .subscribe(
            responseData => this.bundleDetails = <{data: any,title:any}> responseData,
            err => console.log(err),
            () => {
              this.pageContents = this.bundleDetails.data;
              this.pageTitle = this.bundleDetails.title
            }
           );
  }

}
