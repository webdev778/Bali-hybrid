import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalDetailsPage } from './medical-details';

@NgModule({
  declarations: [
    MedicalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalDetailsPage),
  ],
})
export class MedicalDetailsPageModule {}
