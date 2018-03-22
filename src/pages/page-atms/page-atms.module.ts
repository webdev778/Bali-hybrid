import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageAtmsPage } from './page-atms';

@NgModule({
  declarations: [
    PageAtmsPage,
  ],
  imports: [
    IonicPageModule.forChild(PageAtmsPage),
  ],
})
export class PageAtmsPageModule {}
