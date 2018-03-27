import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ExchangeRatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exchange-rate',
  templateUrl: 'exchange-rate.html',
})
export class ExchangeRatePage {

  basePrice = 1
  convertedPrice = 1

  baseCurrency = ''
  convertedCurrency = ''

  exchangeResponse : {base:'', date : '', rates: any};
  currencies : any;
  arrayCurrency = [];

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
                public rest: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExchangeRatePage');
    this.getExchangeRatesCurrencies()
  }

  buttonBackPressed() {
    this.navCtrl.pop();
  }

  setCurrencies() {
    console.log('Set Currencies')
  }

  convertCurrency() {
    let baseRation = Number(this.currencies[this.baseCurrency]);
    let convertedRation = Number(this.currencies[this.convertedCurrency]);

    this.convertedPrice = this.basePrice * (convertedRation/baseRation)
  }

  getExchangeRatesCurrencies() {

    this.rest.getExchangeRatesCurrencies()
         .subscribe(
            responseData => this.exchangeResponse = <{base:'', date : '', rates: any}> responseData,
            err => console.log(err),
            () => {
              this.currencies = this.exchangeResponse.rates
              this.arrayCurrency = Object.keys(this.currencies)
              this.baseCurrency = this.arrayCurrency[0]
              this.convertedCurrency = this.arrayCurrency[0]
              this.convertCurrency()
            }
           );
  }

}
