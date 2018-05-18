import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalAssistancePage } from './medical-assistance';

@NgModule({
  declarations: [
    MedicalAssistancePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalAssistancePage),
  ],
})
export class MedicalAssistancePageModule {}
