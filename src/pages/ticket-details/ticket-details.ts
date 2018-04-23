import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { ConstantsProvider } from '../../providers/constants/constants'
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-ticket-details',
  templateUrl: 'ticket-details.html',
})
export class TicketDetailsPage {

	dashboardData = { profileStatus: true ,numberOfCustomers: 0, name:'Sagar', age:'23', gender:'0', address:'LKO', 
					  email:'sagar@gmail.com',mobile:'9876543210', emergencyContactName: 'Sumit', 
					  emergencyContactNumber: '9123456780'}

	dashboardImages: Array<{title: string, image: any, errorMsg: string}> = [
		{  title: 'Upload Passport Photograph', image: null, errorMsg: 'Select Passport Image'  },
		{  title: 'Upload Luggage Photograph', image: null, errorMsg: 'Select Luggage Image'  },
		{  title: 'Upload Travel Insurance Photograph', image: null, errorMsg: 'Select Travel Insurance Image'  },
		{  title: 'Upload Doctor\'s Letter', image: null, errorMsg: 'Select Doctor\'s Letter Image'  }
	]

	submittedDashboardDetails = false
	
	constructor(  public navCtrl: NavController, 
								public navParams: NavParams,
								public rest: RestProvider,
								private storage: Storage,
								private constantProvider: ConstantsProvider,
								public alertCtrl: AlertController) {

		this.checkForLogin()
	}

	checkForLogin() {
		this.storage.get('is_login').then((isLogin) => {
			 if (!isLogin) {
					 this.moveToLoginPage()
			 }
		 })
	}

	buttonBackPressed() {
			this.navCtrl.pop();
	}

	moveToLoginPage() {
		this.storage.remove('user_data');
		this.storage.remove('auth_token');
		this.storage.set('is_login', false);
		this.constantProvider.loginTitle = 'LOGIN';
		this.constantProvider.loginPage = 'LoginPage'
		this.navCtrl.setRoot('LoginPage')
	}

	imageSelectedFromUser( dashBoardImage,$event) {
		console.log($event.target.files[0])
		console.log(dashBoardImage)

		if ($event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event:any) => {
				dashBoardImage.image = event.target.result;
			}
			reader.readAsDataURL($event.target.files[0]);
		}		
	}

	removeImage(dashBoardImage) {
		dashBoardImage.image = null
	}

	buttonUpdateDetailsPressed(dashboardForm){
		this.presentAlertConfirmEdit()		
	}

	presentAlertConfirmEdit() {
		let alert = this.alertCtrl.create({
			title: 'Are you sure?',
			subTitle: 'You want to bring changes in profile?',
			buttons: [
						{
							text : 'Yes, I\'m sure',
							handler: () => {
								this.dashboardData.profileStatus = false;
							}
						},
						{
							text: 'Dismiss'
						}
					  ]

		});
		alert.present();
	}

	buttonSubmitDetailsPressed(form: NgForm) {
		 console.log(this.dashboardData)

		if (form.valid && this.checkImageSelectionStatus())  {
			this.submittedDashboardDetails = false;
			this.dashboardData.profileStatus = true;
		}else {
			this.submittedDashboardDetails = true;
		}
	}

	checkImageSelectionStatus() {
		for (let image of this.dashboardImages) {
			if (image.image) {
				
			}else{
				return false
			}
		}

		return true
	}

	onlyNumberKey(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}

	updatedashboard() {
		this.dashboardData['user_id'] = 1
			this.rest.updateUserDashboard(this.dashboardData)
				 .subscribe(
						 userData => console.log(userData),
						 err => console.log(err),
						 () => {
							 
							 
						 }
					 );
	}

}
