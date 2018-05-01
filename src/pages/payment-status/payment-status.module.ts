import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentStatusPage } from './payment-status';

@NgModule({
  declarations: [
    PaymentStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentStatusPage),
  ],
})
export class PaymentStatusPageModule {}
