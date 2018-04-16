import { Injectable } from '@angular/core';
import { Stripe } from '@ionic-native/stripe';

/*
  Generated class for the StripeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StripeProvider {

	constructor(private stripe: Stripe) {

	}

	getCardType(cardNumber) {
		return this.stripe.getCardType(cardNumber)
	}

}
