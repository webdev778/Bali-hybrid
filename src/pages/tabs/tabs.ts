import { Component } from '@angular/core';

import { ServicesPage } from '../services/services'

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  servicesRoot = ServicesPage;


  constructor() {}

}
