import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BscHeaderPage } from './bsc-header';

@NgModule({
  declarations: [
    BscHeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(BscHeaderPage),
  ],
})
export class BscHeaderPageModule {}
