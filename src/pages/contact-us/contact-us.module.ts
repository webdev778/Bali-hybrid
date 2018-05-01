import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';

@NgModule({
  declarations: [
    
  ],
  imports: [
    IonicPageModule.forChild(ContactUsPage),
  ],
  entryComponents: [
  	ContactUsPage,
  ]
})
export class ContactUsPageModule {}
