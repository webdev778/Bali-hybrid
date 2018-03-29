import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  responseData : {data: any} ;
	bundleDataFAQ : Array<{question: string, answer: string, isOpen: Boolean}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    this.getFAQList()
  }

  getFAQList() {
  	this.rest.getFAQ()
         .subscribe(
            responseData => this.responseData = <{data: any}> responseData,
            err => console.log(err),
            () => {
              this.bundleDataFAQ = this.responseData.data
            }
           );
  }


  toggleSection(section) {
  	section.isOpen = !section.isOpen
  }

}
