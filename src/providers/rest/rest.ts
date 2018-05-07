
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular'
import { MainRestProvider } from './mainrest';

import { PUBLIC_HEADER,
         SERVICE_URL_LOGIN,
         SERVICE_URL_SIGNUP,
         SERVICE_URL_SOCIAL_LINK, 
         SERVICE_URL_SERVICES, 
         SERVICE_URL_FAQ,
         SERVICE_URL_CONTACT_US,
         SERVICE_URL_PAGES,
         SERVICE_URL_PAGE_CONTENT,
         SERVICE_URL_PUT_QUERY,
         SERVICE_URL_VOLCANO_STATUS,
         SERVICE_URL_HOSPITALS,
         SERVICE_URL_IN_BALI_PAGES,
         SERVICE_URL_BANKS,
         SERVICE_URL_ATMS,
         SERVICE_URL_HOLIDAYS,
         SERVICE_URL_GET_ALERTS,
         SERVICE_URL_GET_TRAVEL_PASS,
         SERVICE_URL_PLACE_ORDER,
         SERVICE_URL_UPDATE_DASHBOARD,
         SERVICE_URL_MAKE_PAYMENT,
         SERVICE_URL_GET_TICKETS,
         SERVICE_URL_UPDATE_TICKET_PROFILE,
         SERVICE_URL_GET_TICKET_INFORMATION,
         SERVICE_URL_ACTIVATE_TICKET,
         SERVICE_URL_AUTHENTICATE_USER,
         SERVICE_URL_VIEW_ORDER_HISTORY,
         SERVICE_URL_VIEW_PROFILE,
         SERVICE_URL_UPDATE_PROFILE,
         SERVICE_URL_FORGET_PASSWORD,
         SERVICE_URL_UPDATE_PASSWORD } from '../constants/constants';




@Injectable()
export class RestProvider {

  	constructor(private mainRestProvider: MainRestProvider,public alertCtrl: AlertController) {
  	}

    // Login Page

    loginUser(loginData) {

      let data = {
        "email" : loginData.email,
        "password" : loginData.password,
      }

      return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_LOGIN, data);
    }

    resetPassord(email) {

      let data = {
        "email" : email,
      }

      return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_FORGET_PASSWORD, data);
    }

    signupUser(signupData) {
      let data = {
        "first_name" : signupData.first_name,
        "last_name" : signupData.last_name,
        "email" : signupData.email,
        "phone" : signupData.phone,
        "gender" : signupData.gender,
        "password" : signupData.password,
      }

      let header = PUBLIC_HEADER;

      return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_SIGNUP, data ,header);
    }

    // BSC Footer Page

  	getSocialLink(): Observable<{ }> {

  		return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_SOCIAL_LINK);
	 }

   // BSC Header Page

   getCMSPages(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_PAGES);
   }

   // CMS Details Page

   getPageContent(page): Observable<{ }> {

   let data = {
     'id' : page.id
   }

    return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_PAGE_CONTENT, data);
   }

   // FAQ Page

    getFAQ(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_FAQ);
    }
   
   // Our Services Page

    getServices(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_SERVICES);
   }

   // Contact Us Page

   getContactUsInfo(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_CONTACT_US);
   }

   sendQuery(queryData): Observable<{ }> {

     let data = {
       'first_name': queryData.first_name,
       'last_name': queryData.last_name,
       'phone': queryData.phone,
       'email': queryData.email,
       'query': queryData.message,
       'subject': queryData.subject
     };

     let header = PUBLIC_HEADER;

      return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_PUT_QUERY, data, header);
   }

   // Today In Bali Page

   getExchangeRatesCurrencies() {
     
     return this.mainRestProvider.fireGetServiceWithoutHeader('http://data.fixer.io/api/latest?access_key=c8e973e6c47c130e32f8a28d1629fef7');
   }

   getBaliPages(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_IN_BALI_PAGES);
   }

   getAtms(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_ATMS);
   }

   getBanks(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_BANKS);
   }

   getVolcanoStatus(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_VOLCANO_STATUS);
   }

   getHolidays(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_HOLIDAYS);
   }

   getAlerts(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_GET_ALERTS);
   }

   getHospitals(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_HOSPITALS);
   }

   // By Travle Pass Page

   getTravelPass(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_GET_TRAVEL_PASS);
   }

   purchaseTravelPass(passInfo): Observable<{ }> {

     let data = {
       'user_id': passInfo.user_id,
       'token' : passInfo.token,
       'ticket_bundle': passInfo.ticket_bundle,
       'total_cost' : passInfo.total_cost

     };

     let header = PUBLIC_HEADER;

      return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_PLACE_ORDER, data, header);
   }

   getTicketsForDashboard(userInfo): Observable<{ }>  {
     let data = {
       'user_id': userInfo.user_id,
       'token' : userInfo.token
     };

     let header = PUBLIC_HEADER;

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_GET_TICKETS, data, header);
   }

   requestOrderHistory(userInfo): Observable<{ }>  {
     let data = {
       'user_id': userInfo.user_id,
       'token' : userInfo.token
     };

     let header = PUBLIC_HEADER;

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_VIEW_ORDER_HISTORY, data, header);
   }

   requestUserProfile(userInfo): Observable<{ }>  {
     let data = {
       'user_id': userInfo.user_id,
       'token' : userInfo.token
     };

     let header = PUBLIC_HEADER;

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_VIEW_PROFILE, data, header);
   }

   updateProfileRecord(userInfo): Observable<{ }> {
     let header = PUBLIC_HEADER;
     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_UPDATE_PROFILE, userInfo, header);


   }

   makeTravelPassPayment(paymentInfo): Observable<{ }> {

      let data = {
       'user_id': paymentInfo.user_id,
       'token' : paymentInfo.token,
       'order_id': paymentInfo.order_id,
       'billing_info' : paymentInfo.billing_info,
       'card_details' : paymentInfo.card_details 

     };

     let header = PUBLIC_HEADER;

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_MAKE_PAYMENT, data, header);
   }


   // Dashboard

   updateTicketInfo(ticketInfo): Observable<{ }> {

      let data = {
        'user_id':ticketInfo.user_id,
        'token': ticketInfo.token,
        'ticket_id': ticketInfo.ticket_id,
        'first_name':  ticketInfo.first_name,
        'last_name': ticketInfo.last_name,
        'date_of_birth': ticketInfo.date_of_birth,
        'email': ticketInfo.email,
        'phone': ticketInfo.phone,
        'address': ticketInfo.address,
        'gender': ticketInfo.gender,
        'emergency_contact_name': ticketInfo.emergency_contact_name,
        'emergency_contact_phone': ticketInfo.emergency_contact_phone,
        'passports': ticketInfo.passports,
        'luggagess': ticketInfo.luggagess,
        'insuarance': ticketInfo.insuarance,
        'doctors_letter': ticketInfo.doctors_letter

     };
     
     let header = PUBLIC_HEADER;

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_UPDATE_TICKET_PROFILE, data, header);
   }


   sendAuthRequest(info): Observable<{ }> {
     let data = {
       'user_id' : info.user_id,
       'signupcode' : info.signupcode
     } 
     
     let header = PUBLIC_HEADER;

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_AUTHENTICATE_USER, data, header);

   }

   getTicketInformation(ticketInfo): Observable<{ }> {
         
      let data = {
        'user_id': ticketInfo.user_id,
        'token': ticketInfo.token,
        'ticket_id': ticketInfo.ticket_id,
    };

     let header = PUBLIC_HEADER;

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_GET_TICKET_INFORMATION, data, header);
   }

   getExpiryTime(requestBundle): Observable<{ }> {

     let data = {
        'user_id': requestBundle.user_id,
        'token': requestBundle.token,
        'ticket_id': requestBundle.ticket_id,
    };

     let header = PUBLIC_HEADER;
     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_ACTIVATE_TICKET, data, header);
   }
   
   sendChangePassWord(passwordInfo): Observable<{ }> {
     let header = PUBLIC_HEADER;
     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_UPDATE_PASSWORD, passwordInfo, header);
   }


   updateUserDashboard(userInfo): Observable<{ }> {

     let data = {
       'user_id': userInfo.user_id,
     };

     let header = PUBLIC_HEADER;

      return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_UPDATE_DASHBOARD, data, header);
   }

    alertServerError(loader) {
     loader.dismiss()
     let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'There is some technical error, please try again later',
      buttons: ['Okay']
    });
    alert.present();

    }

   // Download Image From URL

   downloadImageData(url): Observable<Blob> {
     return this.mainRestProvider.fireGetServiceToDownloadImage(url);
   }

  }
