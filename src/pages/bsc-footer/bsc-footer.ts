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
    this.getSocialLinks();
  }


  getSocialLinks() {

      this.socialLinks = SOCIAL_LINKS
  }


  facebookPressed() {
  	window.open(this.socialLinks.facebook);
  }

  twitterPressed() {
  	window.open(this.socialLinks.twitter);
  }

  googlePressed() {
  	window.open(this.socialLinks.google);
  }

}
