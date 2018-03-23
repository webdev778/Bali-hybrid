import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.bundleMarker = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommonMapPage');
    this.initMap()
  }

  initMap() {

  	console.log('Initializing Map....')

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      minZoom: 4,
      maxZoom: 30,
    });

    var bounds = new google.maps.LatLngBounds();

  	for (let marker of this.bundleMarker) {

    		console.log('marker : ', marker)
    		let markerLat = Number(marker.latitude)
    		let markerLong = Number(marker.longitude)
    		let markerLatLng = {lat: markerLat, lng: markerLong};

    		var mapMarker = new google.maps.Marker({
              position: markerLatLng,
              map: this.map,
              title: 'Hello World!',
        });

        var infowindow = new google.maps.InfoWindow({
          content: marker.label,
          maxWidth: 200,
        });

        mapMarker.addListener('click', function() {
          infowindow.open(this.map, mapMarker);
        });

        bounds.extend(markerLatLng);
        this.map.fitBounds(bounds);
    }

  }

}
