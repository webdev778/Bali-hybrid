import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonMapPage } from './common-map';

@NgModule({
  declarations: [
    CommonMapPage,
  ],
  imports: [
    IonicPageModule.forChild(CommonMapPage),
  ],
})
export class CommonMapPageModule {}
