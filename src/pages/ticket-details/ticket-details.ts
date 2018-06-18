import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,Content } from 'ionic-angular';
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
    @ViewChild(Content) content: Content;

    scrollToTop() {
        this.content.scrollToTop(400);
    }

    ticketData:any
    bundleTicketInfoData : { ticket_info:any }
    bundleTicketDescription:any
    requestBundle = {user_id: '', token: ''}
    errorDateOfBirth = ""
    mandatoryErrorText = ""
    maxFileSize = 500
     

    isDisabled = true

    userInfoBundle = { profileStatus: false ,firstName:'', lastName:'', dob:'',
    gender:'', address:'', email:'',mobile:'', emergencyContactName: '', 
    emergencyContactNumber: '', isActive: 1}

    arrayDashboardImages: Array<{title: string, image: Array<{file:'',extension:''}>, errorMsg: string}> = [
    { title: 'Upload Passport Photograph', image: [], errorMsg: 'Select Passport Image' },
    { title: 'Upload Luggage Photograph', image: [], errorMsg: 'Select Luggage Image' },
    { title: 'Upload Travel Insurance Photograph', image: [], errorMsg: 'Select Travel Insurance Image' },
    { title: 'Upload Doctor\'s Letter', image: [], errorMsg: 'Select Doctor\'s Letter Image' }
    ]

    submittedDashboardDetails = false
    
    constructor(    public navCtrl: NavController, 
        public navParams: NavParams,
        public rest: RestProvider,
        private storage: Storage,
        private constantProvider: ConstantsProvider,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
        private cdr: ChangeDetectorRef) {

        let ticketDataArray = JSON.parse(this.navParams.get('ticket'))

        this.ticketData = {ticket_type: ticketDataArray[0],ticket_id: ticketDataArray[1]}
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

        var fileSizeExceededError = false

        for (var count = 0; count < $event.target.files.length; count++) {
            let reader = new FileReader();
            reader.onload = (event:any) => {
                let file: string = event.target.result
                let base64StringLength = file.length
                let fileSize = 3*(base64StringLength/4)

                if( fileSize < (this.maxFileSize*1024)) {
                    let extentionData = (event.target.result).split(';')[0]
                    let docExtention = extentionData.split('/')[1]
                    
                    if (docExtention == 'msword') {
                        dashBoardImage.image.push({"file": event.target.result, "extension": 'docs'})
                    }
                    else {
                        dashBoardImage.image.push({"file": event.target.result, "extension": docExtention})
                    }
                }
                else {
                    if (!fileSizeExceededError) {
                        this.presentAlertSizeExceeded()
                        fileSizeExceededError = true
                    }                    
                }    
            }
            reader.readAsDataURL($event.target.files[count]);
        } 

        
    }

    presentAlertSizeExceeded() {
        let message = 'File size must be less than or equal to 500 KB'
        this.presentAlert(message)
    }

    removeImage(image,arrayImage) {
        arrayImage.splice(arrayImage.indexOf(image), 1)
    }

    buttonSubmitDetailsPressed(form: NgForm) {
        if (this.userInfoBundle.firstName == null || this.userInfoBundle.lastName == null 
            || this.userInfoBundle.firstName == '' || this.userInfoBundle.lastName == '') {
            this.mandatoryErrorText = "First Name and Last Name are mandatory"
        this.scrollToTop()
        return
    }
    
    this.scrollToTop()
        if (form.valid)  {
            this.submittedDashboardDetails = false;
        }else {
            this.submittedDashboardDetails = true;
        }
        this.errorDateOfBirth = ""
        this.sendTicketsRequestToServer()
    }

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    sendTicketsRequestToServer() {

        this.mandatoryErrorText = ""

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

        if (this.userInfoBundle.dob != null)
        {
            this.errorDateOfBirth = this.constantProvider.validateDate(this.userInfoBundle.dob, this.ticketData.ticket_type)
            if (this.errorDateOfBirth != "")
            {
                return
            }
        }

        let loader = this.loadingController.create({
            content: "Sending ..."
        });

        loader.present()
        
        let passInfo = {
            user_id:this.requestBundle.user_id,
            token: this.requestBundle.token,
            ticket_id: this.ticketData.ticket_id,
            first_name: this.userInfoBundle.firstName,
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
            err => this.rest.alertServerError(err,loader),
            () => {
                loader.dismiss()
            }
            );
    }

    checkStatus(bundle) {
        if (bundle.status == 200) {
            this.presentAlert(bundle.api_message)
        }else {
            this.presentAlert(bundle.api_message)
        }

    }

    getTicketInformationFromServer() {
        let loader = this.loadingController.create({
            content: "Fetching Ticket Details ..."
        });

        loader.present()

        let requestBundle = {
            user_id: this.requestBundle.user_id,
            token: this.requestBundle.token,
            ticket_id: this.ticketData.ticket_id,
        }

        this.rest.getTicketInformation(requestBundle)
        .subscribe(
            responseData => this.bundleTicketInfoData = <{ticket_info : any}> responseData,
            err => this.rest.alertServerError(err,loader),
            () => { 

                this.bundleTicketDescription = <any> this.bundleTicketInfoData.ticket_info; 
                this.userInfoBundle.firstName = this.bundleTicketDescription.first_name;
                this.userInfoBundle.lastName = this.bundleTicketDescription.last_name;
                this.userInfoBundle.dob = this.bundleTicketDescription.date_of_birth;
                this.userInfoBundle.emergencyContactName = this.bundleTicketDescription.emergency_contact_name;
                this.userInfoBundle.emergencyContactNumber = this.bundleTicketDescription.emergency_contact_phone;
                this.userInfoBundle.email = this.bundleTicketDescription.email;
                this.userInfoBundle.mobile = this.bundleTicketDescription.phone;
                this.userInfoBundle.address = this.bundleTicketDescription.address;

                if (this.bundleTicketDescription.is_active == 1)
                {
                    this.isDisabled = true
                }else{
                    this.isDisabled = false
                }

                ​this.userInfoBundle.address = this.bundleTicketDescription.address;

                this.arrayDashboardImages[0].image = this.convertArrayImageUrlToData(this.bundleTicketDescription.passports)
                this.arrayDashboardImages[1].image = this.convertArrayImageUrlToData(this.bundleTicketDescription.luggagess) 
                this.arrayDashboardImages[2].image = this.convertArrayImageUrlToData(this.bundleTicketDescription.insuarance) 
                this.arrayDashboardImages[3].image = this.convertArrayImageUrlToData(this.bundleTicketDescription.doctors_letter) 

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
                
                this.cdr.detectChanges();
                loader.dismiss()
            })
    }

    convertArrayImageUrlToData(document) {
        var uploadDoc: Array<{file:'',extension:''}> = []

        for(let imageUrl of document){

            var blob : any
    
            this.rest.downloadImageData(imageUrl.file)
            .subscribe(
                data => blob = data,
                err => console.log(""),
                () => {
                    var reader = new FileReader();
                    reader.readAsDataURL(blob); 
                    reader.onloadend = function() {
                    uploadDoc.push({"file":reader.result, "extension": imageUrl.extension})
                    return uploadDoc
                   } 
                }
                );
        }
        return uploadDoc
    }

    openPDF(document) {
        let pdfWindow = window.open("")
        pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf; " +
                                 encodeURI(document.file)+"'></iframe>")
    }

    openDOC(document) {
        let docWindow = window.open("")
        docWindow.document.write("<iframe width='100%' height='100%' src='data:application/msword; " +
                                 encodeURI(document.file)+"'></iframe>")
    }

    openImage(document) {
        this.navCtrl.push('ImageViewPage', {image: document.file})
    }

    presentAlert(message) {
        let alert = this.alertCtrl.create({
            title: '',
            subTitle: message,
            buttons: ['Okay']
        });
        alert.present();
    }

}



