import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolcanoStatusPage } from './volcano-status';

@NgModule({
  declarations: [
    VolcanoStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(VolcanoStatusPage),
  ],
})
export class VolcanoStatusPageModule {}
