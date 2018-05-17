
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular'
import { MainRestProvider } from './mainrest';
import { App,NavController } from "ionic-angular";
import { Storage } from '@ionic/storage';

import {
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
  SERVICE_URL_UPDATE_PASSWORD,
  SERVICE_URL_SOCIAL_LOGIN,
  SERVICE_URL_LOGOUT,
  SERVICE_URL_GET_SERVICE_CONTENT,
  SERVICE_URL_CHANGE_PASSWORD,
  SERVICE_URL_CHECK_FORGET_PASSWORD,
  ConstantsProvider } from '../constants/constants';


  @Injectable()
  export class RestProvider {

  	constructor(private mainRestProvider: MainRestProvider,public alertCtrl: AlertController,private app:App,
      public constantProvider: ConstantsProvider, private storage: Storage) {
  	}

    // Login Page

    loginUser(loginData) {

      let data = {
        "email" : loginData.email,
        "password" : loginData.password,
      }

      return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_LOGIN, data);
    }

    socialLoginUser(socialData): Observable<{ }> {

      let data = {
        "email" : socialData.email,
        "first_name" : socialData.first_name,
        "last_name" : socialData.last_name,
        "fb_id" : socialData.fb_id,
        "gmail_id": socialData.gmail_id
      }

      return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_SOCIAL_LOGIN, data);
    }

    resetPassord(email) {

      let data = {
        "email" : email,
      }

      return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_FORGET_PASSWORD, data);
    }

     checkForgetPassword(requestBundle): Observable<{ }> {     
      return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_CHECK_FORGET_PASSWORD, requestBundle);
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

      return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_SIGNUP, data );
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

   getPageContent(id): Observable<{ }> {

     let data = {
       'id' : id
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

     return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_PUT_QUERY, data);
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

   requestServices(passInfo): Observable<{ }> {
     let data = {
        'service_id': passInfo
     };

     return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_GET_SERVICE_CONTENT, data);
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

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_PLACE_ORDER, data, data.token);
   }

   getTicketsForDashboard(userInfo): Observable<{ }>  {
     let data = {
       'user_id': userInfo.user_id,
       'token' : userInfo.token
     };

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_GET_TICKETS, data, data.token);
   }

   requestOrderHistory(userInfo): Observable<{ }>  {
     let data = {
       'user_id': userInfo.user_id,
       'token' : userInfo.token
     };

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_VIEW_ORDER_HISTORY, data, data.token);
   }


   updatePassword(requestBundle): Observable<{ }> {     
     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_CHANGE_PASSWORD, requestBundle, requestBundle.token);
   }

   requestUserProfile(userInfo): Observable<{ }>  {
     let data = {
       'user_id': userInfo.user_id,
       'token' : userInfo.token
     };

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_VIEW_PROFILE, data, data.token);
   }

   updateProfileRecord(userInfo): Observable<{ }> {
     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_UPDATE_PROFILE, userInfo, userInfo.token);
   }

   makeTravelPassPayment(paymentInfo): Observable<{ }> {

     let data = {
       'user_id': paymentInfo.user_id,
       'token' : paymentInfo.token,
       'order_id': paymentInfo.order_id,
       'billing_info' : paymentInfo.billing_info,
       'card_details' : paymentInfo.card_details 

     };

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_MAKE_PAYMENT, data, data.token);
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
     
     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_UPDATE_TICKET_PROFILE, data, data.token);
   }

   sendAuthRequest(info): Observable<{ }> {
     let data = {
       'user_id' : info.user_id,
       'signupcode' : info.signupcode
     } 

     return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_AUTHENTICATE_USER, data);
   }

   getTicketInformation(ticketInfo): Observable<{ }> {

     let data = {
       'user_id': ticketInfo.user_id,
       'token': ticketInfo.token,
       'ticket_id': ticketInfo.ticket_id,
     };

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_GET_TICKET_INFORMATION, data, data.token);
   }

   logoutRequest(logoutData): Observable<{ }> {

     let data = {
       'user_id': logoutData.user_id,
       'token': logoutData.token     
     };
     
     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_LOGOUT, data, data.token);
   }

   getExpiryTime(requestBundle): Observable<{ }> {

     let data = {
       'user_id': requestBundle.user_id,
       'token': requestBundle.token,
       'ticket_id': requestBundle.ticket_id,
     };

     return this.mainRestProvider.firePostServiceWithHeader(SERVICE_URL_ACTIVATE_TICKET, data, data.token);
   }
   
   sendChangePassWord(passwordInfo): Observable<{ }> {
     return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_UPDATE_PASSWORD, passwordInfo);
   }
   
   alertServerError(err,loader) {
     loader.dismiss()
     if (!(err.status == 400 || err.status == 401 || err.status == 402 || err.status == 403)) {
       let alert = this.alertCtrl.create({
         title: '',
         subTitle: 'There is some technical error, please try again later',
         buttons: ['Okay']
       });
       alert.present();
     }
     else {
       this.setRootLoginPage(err)
     }
   }

   setRootLoginPage(response) {
     if( response.status == 400 || response.status == 401 || response.status == 402 || response.status == 403 ) {
       this.storage.remove('user_data');
       this.storage.remove('auth_token');
       this.storage.set('is_login', false);

       this.constantProvider.loginTitle = 'LOGIN';
       this.constantProvider.loginPage = 'LoginPage'
       this.constantProvider.isLogin = false;
       (this.app.getRootNav() as NavController).setRoot('LoginPage')
     }
     
   }

   // Download Image From URL

   downloadImageData(url): Observable<Blob> {
     return this.mainRestProvider.fireGetServiceToDownloadImage(url);
   }

 }
