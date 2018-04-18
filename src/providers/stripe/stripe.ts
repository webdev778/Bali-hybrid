import { Injectable } from '@angular/core';
import { Stripe } from '@ionic-native/stripe';

/*
  Generated class for the StripeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StripeProvider {

	constructor(private stripe:Stripe) {
		
	}

	getCardName(cardNumber) {
		console.log("card type ---")
		console.log(this.stripe.getCardType(cardNumber))
	}

	getPublishableKey(cardDetails){
		return this.stripe.setPublishableKey('pk_test_gFlOMAZurb7qqHFteRKcoDkv');
	}

	getTokenCard(cardDetails){
		console.log("token ---")
		console.log(cardDetails)
		this.stripe.createCardToken(cardDetails)
	   .then(token => console.log(token.id))
	   .catch(error => console.error(error));

	}

}
