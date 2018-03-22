import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VaccinationPage } from './vaccination';

@NgModule({
  declarations: [
    VaccinationPage,
  ],
  imports: [
    IonicPageModule.forChild(VaccinationPage),
  ],
})
export class VaccinationPageModule {}
