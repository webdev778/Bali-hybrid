
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
         SERVICE_URL_ATMS } from '../constants/constants';




@Injectable()
export class RestProvider {

  	constructor(private mainRestProvider: MainRestProvider) {
    	console.log('Home Service Provider')
  	}

    // Login Page

    loginUser(loginData) {

      let data = {
        "email" : loginData.email,
        "password" : loginData.password,
      }

      return this.mainRestProvider.firePostServiceWithoutHeader(SERVICE_URL_LOGIN, data);
    }

    signupUser(signupData) {
      let data = {
        "first_name" : signupData.first_name,
        "last_name" : signupData.last_name,
        "username" : signupData.username,
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

   getHospitals(): Observable<{ }> {

      return this.mainRestProvider.fireGetServiceWithoutHeader(SERVICE_URL_HOSPITALS);
   }

}
