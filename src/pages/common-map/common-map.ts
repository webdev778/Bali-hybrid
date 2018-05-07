import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

declare var google;

/**
 * Generated class for the CommonMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-common-map',
  templateUrl: 'common-map.html',
})
export class CommonMapPage {

	@ViewChild('map') mapElement: ElementRef;
 	map: any;

 	bundleMarker : Array<{latitude: '', longitude: '', label: ''}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  	this.bundleMarker = JSON.parse(this.navParams.get('location'))
  }

  ionViewDidLoad() {
    this.initMap()
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 16,
      center: {lat: Number(this.bundleMarker[0].latitude), lng: Number(this.bundleMarker[0].longitude)},
      minZoom: 3,
      maxZoom: 30,
    });

    var bounds = new google.maps.LatLngBounds();

  	for (let marker of this.bundleMarker) {

    		let markerLat = Number(marker.latitude)
    		let markerLong = Number(marker.longitude)
    		let markerLatLng = {lat: markerLat, lng: markerLong};

        if((markerLat > 90)||(markerLat < -90)|| (markerLong > 180)||(markerLong < -180) || 
          isNaN(markerLat) || isNaN(markerLong)){
                 this.presentAlert("Not able to Locate Place");
        }
        else
        {
          	var mapMarker = new google.maps.Marker({
                  position: markerLatLng,
                  map: this.map,
                  title: marker.label,
            });

            var infowindow = new google.maps.InfoWindow({
              content: marker.label,
              maxWidth: 200,
            });

            mapMarker.addListener('click', function() {
              infowindow.open(this.map, mapMarker);
            });

            bounds.extend(markerLatLng);
        }

        if (this.bundleMarker.length > 1) {
          this.map.fitBounds(bounds);
        }else{
          this.map.setZoom(16)
        }

    }

  }

  buttonBackPressed() {
    this.navCtrl.pop()
  }

  presentAlert(message) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }

}
