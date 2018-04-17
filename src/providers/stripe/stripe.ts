import { Injectable } from '@angular/core';

/*
  Generated class for the StripeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StripeProvider {

	constructor() {
		
	}

	getCardType(cardNumber) {
		return 'visa'
	}

}
