import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
/**
* Generated class for the MedicalLocationPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-medical-location',
	templateUrl: 'medical-location.html',
})
export class MedicalLocationPage {

	passedData = ''		
	bundleData:any
	title = ''
	isListLoaded = false
	medicalLocations:any
	medicalTitle = ''

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

		this.rest.getMedicalLocation(type_id)
		.subscribe(
			responseData => this.bundleData = responseData, 
			err => this.rest.alertServerError(err,loader),
			() => {   
				loader.dismiss()
				this.medicalLocations = this.bundleData.data
				this.medicalTitle = this.bundleData.title

			}
			)
	}

	medicalLocationPressed(locationData) {
		let type_id = this.passedData
		let location_id = locationData.location_id

		let medicalDataString:string[] = []
		medicalDataString.push(type_id)
		medicalDataString.push(location_id)

		this.navCtrl.push('MedicalDetailsPage', {
        'id': JSON.stringify(medicalDataString),
      })

	}

	buttonBackPressed() {
		this.navCtrl.pop()
	}
}
