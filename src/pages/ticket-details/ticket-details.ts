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
					  				  
	passports: Array<{image: any}> = [{image: null}]
	luggagess: Array<{image:any}> = [{image: null}]
	insurance: Array<{image:any}> = [{image: null}]
	doctors_letter: Array<{image:any}> = [{image: null}]

	passportBundle : Array<any> = []
	luggageBundle : Array<any> = []
	insuranceBundle : Array<any> = []
	doctorLetterBundle : Array<any> =[]

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
						console.log("local data")
						console.log(this.requestBundle)
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


	imageLuggageSelectedFromUser( dashBoardImage,$event) {
		if ($event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event:any) => {
				dashBoardImage.image = event.target.result;
			}
			reader.readAsDataURL($event.target.files[0]);
		}		
		this.luggagess.push({ image: null})
	
	}

	imageInsuranceSelectedFromUser( dashBoardImage,$event) {
		if ($event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event:any) => {
				dashBoardImage.image = event.target.result;
			}
			reader.readAsDataURL($event.target.files[0]);
		}		
		this.insurance.push({ image: null})
	
	}

	imageDoctorsLetterSelectedFromUser( dashBoardImage,$event) {
		if ($event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event:any) => {
				dashBoardImage.image = event.target.result;
			}
			reader.readAsDataURL($event.target.files[0]);
		}		
		this.doctors_letter.push({ image: null})
	
	}

	imagePassportSelectedFromUser( dashBoardImage,$event) {
		if ($event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event:any) => {
				dashBoardImage.image = event.target.result;
			}
			reader.readAsDataURL($event.target.files[0]);
		}		
		this.passports.push({ image: null})

	}

	

	removeImage(dashBoardImage) {
		dashBoardImage.image = null
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

		for (let data of this.passports) {
			this.passportBundle.push(data.image)
		}
		for (let data of this.luggagess) {
			this.luggageBundle.push(data.image)
		}
		for (let data of this.insurance) {
			this.insuranceBundle.push(data.image)
		}
		for (let data of this.doctors_letter) {
			this.doctorLetterBundle.push(data.image)
		}



		this.passportBundle.pop()
		this.luggageBundle.pop()
		this.insuranceBundle.pop()
		this.doctorLetterBundle.pop()

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

		console.log("local data")
		console.log(this.requestBundle)
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
			passports: this.passportBundle,
			luggagess: this.luggageBundle,
			insuarance: this.insuranceBundle,
			doctors_letter: this.doctorLetterBundle,

		}
		
		console.log(passInfo)

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
					
					console.log("data recieved from server")
					console.log(this.bundleTicketDescription)

					this.userInfoBundle.firstName = this.bundleTicketDescription.first_name;
					this.userInfoBundle.lastName = this.bundleTicketDescription.last_name;
					this.userInfoBundle.dob = this.bundleTicketDescription.date_of_birth;
					this.userInfoBundle.emergencyContactName = this.bundleTicketDescription.emergency_contact_name;
					this.userInfoBundle.emergencyContactNumber = this.bundleTicketDescription.emergency_contact_phone;
					this.userInfoBundle.email = this.bundleTicketDescription.email;
					this.userInfoBundle.mobile = this.bundleTicketDescription.phone;
					this.userInfoBundle.isActive = this.bundleTicketDescription.is_active;
​					this.userInfoBundle.address = this.bundleTicketDescription.address;
					this.userInfoBundle.profileStatus = this.bundleTicketDescription.is_complete

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



