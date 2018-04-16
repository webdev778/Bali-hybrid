import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

	dashboardData = { numberOfCustomers: 0, name:'', age:'', gender:'', address:'', email:'', mobile:'', emergencyContactName: '', emergencyContactNumber: ''}

	dashboardImages: Array<{title: string, image: any, errorMsg: string}> = [

		{  title: 'Upload Passport Photograph', image: null, errorMsg: 'Select Passport Image'  }  ,
		{  title: 'Upload Luggage Photograph', image: null, errorMsg: 'Select Luggage Image'  }  ,
		{  title: 'Upload Travel Insurance Photograph', image: null, errorMsg: 'Select Travel Insurance Image'  }  ,
		{  title: 'Upload Doctor\'s Letter', image: null, errorMsg: 'Select Doctor\'s Letter Image'  }  ,

	]

	arrayCustomers = [1,2,3,4,5,6,7,8,9]


	travelPasses :Array<{ serialNumber:number, family:number, adult:number, child:number, isActive:number }> = [
			{ serialNumber : 0, family:4, adult:4, child:2, isActive:1 },
			{ serialNumber : 1, family:3, adult:3, child:1, isActive:1 },
			{ serialNumber : 2, family:2, adult:3, child:0, isActive:0 },
			{ serialNumber : 3, family:6, adult:1, child:4, isActive:1 }
		
	  ]


	submittedDashboardDetails = false
	
	constructor(  public navCtrl: NavController, 
								public navParams: NavParams,
								public rest: RestProvider,
								private storage: Storage,
								private constantProvider: ConstantsProvider) {

		this.checkForLogin()

		
	}

	checkForLogin() {
		this.storage.get('is_login').then((isLogin) => {
			 if (!isLogin) {
					 this.moveToLoginPage()
			 }
		 })
	}

	ionViewDidLoad() {
		
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

	buttonSubmitDetailsPressed(form: NgForm) {
		 console.log(this.dashboardData)
		if (form.valid && this.checkImageSelectionStatus())  {
			this.submittedDashboardDetails = false;
		}else {
			this.submittedDashboardDetails = true;
		}
	}

	checkImageSelectionStatus() {
		for (let image of this.dashboardImages) {
			if (image.image) {
				// continue
			}else{
				return false
			}
		}

		return true
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
