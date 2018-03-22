import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageBankPage } from './page-bank';

@NgModule({
  declarations: [
    PageBankPage,
  ],
  imports: [
    IonicPageModule.forChild(PageBankPage),
  ],
})
export class PageBankPageModule {}
