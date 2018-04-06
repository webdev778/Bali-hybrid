import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  dashboardData = { numberOfCustomers: '', emergencyContactName: '', emergencyContactNumber: '', 
          					imgPassport: '',imgLuggage: '', imgTravelInsurance:'', imgDoctorLetter: ''
          					};

  submittedDashboardDetails = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  buttonSubmitDetailsPressed(form: NgForm) {

    this.submittedDashboardDetails = true;

    console.log("value recieved from form is : "+this.dashboardData.imgPassport);

    if (form.valid) {
      this.submittedDashboardDetails = false;
    }
  }

}
