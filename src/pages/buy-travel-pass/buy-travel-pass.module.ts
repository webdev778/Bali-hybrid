import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyTravelPassPage } from './buy-travel-pass';

@NgModule({
  declarations: [
    BuyTravelPassPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyTravelPassPage),
  ],
})
export class BuyTravelPassPageModule {}
