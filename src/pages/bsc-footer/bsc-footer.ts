import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SOCIAL_LINKS } from '../../providers/constants/constants';

/**
 * Generated class for the BscFooterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bsc-footer',
  templateUrl: 'bsc-footer.html',
})
export class BscFooterPage {

	socialLinks: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    console.log('Construct BscFooterPage');
    
    this.getSocialLinks();
  }


  getSocialLinks() {

      this.socialLinks = SOCIAL_LINKS
  }


  facebookPressed() {
    console.log('open link : ', this.socialLinks.facebook)
  	window.open(this.socialLinks.facebook);
  }

  twitterPressed() {
    console.log('open link : ', this.socialLinks.twitter)
  	window.open(this.socialLinks.twitter);
  }

  googlePressed() {
    console.log('open link : ', this.socialLinks.google)
  	window.open(this.socialLinks.google);
  }

}
