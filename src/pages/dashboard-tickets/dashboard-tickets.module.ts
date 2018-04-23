import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardTicketsPage } from './dashboard-tickets';

@NgModule({
  declarations: [
    DashboardTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardTicketsPage),
  ],
})
export class DashboardTicketsPageModule {}
