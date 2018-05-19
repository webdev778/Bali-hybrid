import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the MedicalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medical-details',
  templateUrl: 'medical-details.html',
})
export class MedicalDetailsPage {

  passedData = ''		
  bundleData:any
  title = ''
  isListLoaded = false

  bundleArrayContent:any[] = []
  constructor(		public navCtrl: NavController, 
				  	public navParams: NavParams, 
				  	public loadingController: LoadingController,
				  	public rest: RestProvider,
			  ) {
  	this.passedData = JSON.parse(this.navParams.get('id'))
  }

  ionViewDidLoad() {
    this.getMedicalPageData()
  }

  getMedicalPageData() {
	let type_id = this.passedData

	let loader = this.loadingController.create({
	content: "Loading Services ..."
	});
	loader.present()

	this.rest.getMedicalPageData(type_id)
		.subscribe(
			responseData => this.bundleData = responseData, 
			err => this.rest.alertServerError(err,loader),
			() => {   
			    loader.dismiss()
			    this.isListLoaded = true
			    this.bundleArrayContent = this.bundleData.data
			    this.title = this.bundleData.title
			    
				}
		)
	}

	showAllOnMapPressed() {
		console.log(this.bundleArrayContent)
		var markerArray : Array<string> =[]
		for (let mapPoints of this.bundleArrayContent) {
			var marker = {latitude: '', longitude: '', label: ''};

			marker.latitude = mapPoints.lat
			marker.longitude = mapPoints.long
			marker.label = mapPoints.name

			let markerString = marker.latitude + ',' + marker.longitude + ',' + marker.label
			console.log('marker string : '+ markerString)
	    	markerArray.push(markerString);
		}
		console.log(markerArray)
		this.navCtrl.push('CommonMapPage', {
	      		'location': JSON.stringify(markerArray)
	    	});
	}

	buttonBackPressed() {
		this.navCtrl.pop()
	}	

	buttonShowOnMapPressed(hospital) {
	    var markerArray : Array<any> = [];
	    var marker = {latitude: '', longitude: '', label: ''};

	    marker.latitude = hospital.lat
	    marker.longitude = hospital.long
	    marker.label = hospital.name

	    let markerString = marker.latitude + ',' + marker.longitude + ',' + marker.label
	    markerArray.push(markerString);

	    this.navCtrl.push('CommonMapPage', {
	      'location': JSON.stringify(markerArray)
	    });
	  }


}
