import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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

	ticketData:any
	bundleTicketInfoData : { ticket_info:any }
	bundleTicketDescription:any
	requestBundle = {user_id: '', token: ''}

	userInfoBundle = { profileStatus: false ,firstName:'', lastName:'', dob:'',
					  gender:'', address:'', email:'',mobile:'', emergencyContactName: '', 
					  emergencyContactNumber: '', isActive: 0}
					  				  
	arrayDashboardImages: Array<{title: string, image: Array<any>, errorMsg: string}> = [
		{ title: 'Upload Passport Photograph', image: [], errorMsg: 'Select Passport Image' },
		{ title: 'Upload Luggage Photograph', image: [], errorMsg: 'Select Luggage Image' },
		{ title: 'Upload Travel Insurance Photograph', image: [], errorMsg: 'Select Travel Insurance Image' },
		{ title: 'Upload Doctor\'s Letter', image: [], errorMsg: 'Select Doctor\'s Letter Image' }
	]

	submittedDashboardDetails = false
	
	constructor(  	public navCtrl: NavController, 
					public navParams: NavParams,
					public rest: RestProvider,
					private storage: Storage,
					private constantProvider: ConstantsProvider,
					public alertCtrl: AlertController,
					public loadingController: LoadingController) {

		this.ticketData = JSON.parse(this.navParams.get('ticket'))
	}

	ionViewWillEnter() {
		this.checkForLogin()
	}

	checkForLogin() {
		this.storage.get('is_login').then((isLogin) => {
			 if (!isLogin) {
					 this.moveToLoginPage()
			 }
			 else{
				this.storage.get('user_data').then((user_data) => {
					this.requestBundle.user_id = JSON.parse(user_data).id;
					this.storage.get('auth_token').then((authToken) => {
						this.requestBundle.token = authToken;
						this.getTicketInformationFromServer()
					});
				});
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


	imageSelectedFromUser(dashBoardImage,$event) {

		for (var count = 0; count < $event.target.files.length; count++) {
			let reader = new FileReader();
			reader.onload = (event:any) => {
				dashBoardImage.image.push(event.target.result)
			}
			reader.readAsDataURL($event.target.files[count]);
		}			
	}


	removeImage(image,arrayImage) {
		arrayImage.splice(arrayImage.indexOf(image), 1)
	}

	buttonUpdateDetailsPressed(dashboardForm){
		this.userInfoBundle.profileStatus = false;	
	}

	buttonSubmitDetailsPressed(form: NgForm) {
		
		if (form.valid)  {
			this.submittedDashboardDetails = false;
			this.userInfoBundle.profileStatus = true;
		}else {
			this.submittedDashboardDetails = true;
		}
		this.sendTicketsRequestToServer()
	}

	

	onlyNumberKey(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}

	sendTicketsRequestToServer() {
		let loader = this.loadingController.create({
			content: "Sending ..."
		});

		loader.present()

		let gender = 0

		if (this.userInfoBundle.gender == 'Male') {
			gender = 0
		}
		else if (this.userInfoBundle.gender == 'Female') {
			gender = 1
		}
		else {
			gender = null
		}

		let passInfo = {
			user_id:this.requestBundle.user_id,
			token: this.requestBundle.token,
			ticket_id: this.ticketData.ticket_id,
			first_name:	this.userInfoBundle.firstName,
			last_name: this.userInfoBundle.lastName,
			email: this.userInfoBundle.email,
			phone: this.userInfoBundle.mobile,
			date_of_birth: this.userInfoBundle.dob,
			address: this.userInfoBundle.address,
			gender: gender,
			emergency_contact_name: this.userInfoBundle.emergencyContactName,
			emergency_contact_phone: this.userInfoBundle.emergencyContactNumber,
			passports: this.arrayDashboardImages[0].image,
			luggagess: this.arrayDashboardImages[1].image,
			insuarance: this.arrayDashboardImages[2].image,
			doctors_letter: this.arrayDashboardImages[3].image,

		}
		
		this.rest.updateTicketInfo(passInfo)
		.subscribe(
			responseData => this.checkStatus(responseData),
			err => loader.dismiss(),
			() => {
				loader.dismiss()
			}
			);
	}

	checkStatus(bundle) {
		if (bundle.status == 200) {
			this.presentAlert('Success', bundle.order_id)
		}else {
			this.presentAlert('Error', bundle.api_message)
		}

	}

	getTicketInformationFromServer() {
		let loader = this.loadingController.create({
			content: "Fetching Tickets ..."
		});

		let requestBundle = {
			user_id: this.requestBundle.user_id,
			token: this.requestBundle.token,
			ticket_id: this.ticketData.ticket_id,
		}

		this.rest.getTicketInformation(requestBundle)
		.subscribe(
			responseData => this.bundleTicketInfoData = <{ticket_info : any}> responseData,
			err => loader.dismiss(),
			() => {
					this.bundleTicketDescription = <any> this.bundleTicketInfoData.ticket_info;

					this.userInfoBundle.firstName = this.bundleTicketDescription.first_name;
					this.userInfoBundle.lastName = this.bundleTicketDescription.last_name;
					this.userInfoBundle.dob = this.bundleTicketDescription.date_of_birth;
					this.userInfoBundle.emergencyContactName = this.bundleTicketDescription.emergency_contact_name;
					this.userInfoBundle.emergencyContactNumber = this.bundleTicketDescription.emergency_contact_phone;
					this.userInfoBundle.email = this.bundleTicketDescription.email;
					this.userInfoBundle.mobile = this.bundleTicketDescription.phone;
					this.userInfoBundle.isActive = this.bundleTicketDescription.is_active;
​					this.userInfoBundle.address = this.bundleTicketDescription.address;

					if (this.bundleTicketDescription.is_complete == 1){
						this.userInfoBundle.profileStatus = true
					}else{
						this.userInfoBundle.profileStatus = false
					}

					this.arrayDashboardImages[0].image = this.constantProvider.convertArrayImageUrlToData(this.bundleTicketDescription.passports)
					this.arrayDashboardImages[1].image = this.constantProvider.convertArrayImageUrlToData(this.bundleTicketDescription.luggagess) 
					this.arrayDashboardImages[2].image = this.constantProvider.convertArrayImageUrlToData(this.bundleTicketDescription.insuarance) 
					this.arrayDashboardImages[3].image = this.constantProvider.convertArrayImageUrlToData(this.bundleTicketDescription.doctors_letter) 

					if(this.bundleTicketDescription.gender == 0) {
						this.userInfoBundle.gender = "Male"
					}
					else if (this.bundleTicketDescription == 1) {
						this.userInfoBundle.gender = "Female"
					}
					else if (this.bundleTicketDescription == 2){
						this.userInfoBundle.gender = "Transgender"
					}else {
						this.userInfoBundle.gender = null
					}


				   })
	}

	presentAlert(title,message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['Okay']
		});
		alert.present();
	}
}



