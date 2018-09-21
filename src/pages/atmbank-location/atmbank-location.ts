import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
/**
* Generated class for the bankLocationPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-abank-location',
	templateUrl: 'atmbank-location.html',
})
export class AtmBankLocationPage {

	passedData = ''		
	bundleData:any
	title = ''
	isListLoaded = false
	bankLocations:any
	bankTitle = ''

	constructor(	public navCtrl: NavController, 
		public navParams: NavParams, 
		public loadingController: LoadingController,
		public rest: RestProvider,
		) {
		this.passedData = JSON.parse(this.navParams.get('id'))
	}

	ionViewDidLoad() {
		this.getLocationList()
	}

	getLocationList() {
		let type_id = this.passedData
		let loader = this.loadingController.create({
			content: "Loading Locations ..."
		});
		loader.present()

		this.rest.getAtmbankLocation(type_id)
		.subscribe(
			responseData => this.bundleData = responseData, 
			err => this.rest.alertServerError(err,loader),
			() => {   
				loader.dismiss()
				this.bankLocations = this.bundleData.data
				this.bankTitle = this.bundleData.title

			}
			)
	}

	bankLocationPressed(locationData) {
		let type_id = this.passedData
		let location_id = locationData.location_id

		let bankDataString:string[] = []
		bankDataString.push(type_id)
		bankDataString.push(location_id)

		this.navCtrl.push('bankDetailsPage', {
        'id': JSON.stringify(bankDataString),
      })

	}

	buttonBackPressed() {
		this.navCtrl.pop()
	}
}
