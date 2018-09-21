import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentPage } from './document';

@NgModule({
  declarations: [
    
  ],
  imports: [
    IonicPageModule.forChild(DocumentPage),
  ],
  entryComponents: [
  	DocumentPage,
  ]
})
export class DocumentPageModule {}
