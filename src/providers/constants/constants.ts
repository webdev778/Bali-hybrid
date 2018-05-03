

import { Injectable } from '@angular/core';

import { MainRestProvider } from '../rest/mainrest';

// Global Variables

export var CMS_PAGES : Array<{id: any, name: '', alias: '', page: any}> = [];
export var SOCIAL_LINKS = { facebook :'', twitter: '', google: ''};
export let GOOGLE_KEY = "AIzaSyCecgk4WWZR2HgSmSczljuNDqQaJyd8psg";

// public header

export let PUBLIC_HEADER = {
	
}

// Constants for Web Services

export let BASE_URL = "http://192.168.0.34/BaliTours/public/api/";
// export let BASE_URL = "http://admin.balisupport.tk/api/";

//Authenticate User

export let SERVICE_URL_AUTHENTICATE_USER = BASE_URL + "authenticateUser"

// Login Page
export let SERVICE_URL_LOGIN = BASE_URL+"login";
export let SERVICE_URL_SIGNUP = BASE_URL+"signup";

// BSC Footer
export let SERVICE_URL_SOCIAL_LINK = BASE_URL+"getSocialLinks";

// Our Services Page
export let SERVICE_URL_SERVICES = BASE_URL+"getServices"

// FAQ Page
export let SERVICE_URL_FAQ = BASE_URL+"getFaq";

// CMS Pages
export let SERVICE_URL_PAGES = BASE_URL+"getPages";
export let SERVICE_URL_PAGE_CONTENT = BASE_URL+"getPageContent";

// Contact Us Page
export let SERVICE_URL_CONTACT_US = BASE_URL+"getContactUsInfo";
export let SERVICE_URL_PUT_QUERY = BASE_URL+"putQuery";

// Today In Bali Page
export let SERVICE_URL_IN_BALI_PAGES = BASE_URL+"getTodayinBali";
export let SERVICE_URL_VOLCANO_STATUS = BASE_URL+"getVolcanoStatus";
export let SERVICE_URL_HOSPITALS = BASE_URL+"getHospitals";
export let SERVICE_URL_BANKS = BASE_URL+"getBanks";
export let SERVICE_URL_ATMS = BASE_URL+"getAtms";
export let SERVICE_URL_HOLIDAYS = BASE_URL+"getHolidays";
export let SERVICE_URL_GET_ALERTS = BASE_URL+"getAlert";

// Buy Travle Pass Page
export let SERVICE_URL_GET_TRAVEL_PASS = BASE_URL+"getTravelPasses";
export let SERVICE_URL_SAVE_TRAVEL_PASS = BASE_URL+"addToCart";
export let SERVICE_URL_MAKE_PAYMENT= BASE_URL+"makepayment";
export let SERVICE_URL_PLACE_ORDER= BASE_URL+"placeorder";


// Dashboard
export let SERVICE_URL_UPDATE_DASHBOARD = BASE_URL+"updateDashboard";
export let SERVICE_URL_GET_TICKETS = BASE_URL + "gettickets";
export let SERVICE_URL_UPDATE_TICKET_PROFILE = BASE_URL + "updateTicketInfo";
export let SERVICE_URL_GET_TICKET_INFORMATION = BASE_URL + "getTicketInformation";
export let SERVICE_URL_ACTIVATE_TICKET = BASE_URL + "activateTicket";
export let SERVICE_URL_VIEW_ORDER_HISTORY = BASE_URL + "viewOrderHistory";
export let SERVICE_URL_VIEW_PROFILE = BASE_URL + "viewProfile";

export let API_HEADER = { 	
							};

export interface TicketStructure { 
	ticket_id: number, 
	quantity: number, 
	price: number,
	ticket_type: string,
	ticket_details: any,
}

export interface TravellersInfoDS {
	first_name: string,
	last_name: string,
	date_of_birth: string,
	gender: string,
	email: string,
	ticket_type: string,
}

export interface OrderHistoryStructure {
	"order_id": string,
    "order_no": string,
    "user_id": number,
    "amount": number,
    "name": string,
    "transaction_id": string,
    "order_date": any
    "ticket_info" : any
    "is_open":boolean
}

export interface UserDetailsDS { 
	"id": string, 
	"first_name": string, 
	"last_name": string,
	"username": string,
	"email": string,
	"status": number,
	"phone": string,
	"gender": number, 
	"created_at": string, 
	"updated_at": string, 
	"deleted_at": string
}

export interface TicketToShowStructure { 
	"ticket_id":number,
	"first_name":string, 
	"last_name":string,
	"ticket_type" :string,
	"is_active":number,
	"is_complete":number,
	"travel_pass_code" :number,
	"expiry_date":number,
	"timer_value":string, 
	"current_date":number,
	"is_open":boolean
}

@Injectable()
export class ConstantsProvider {
	loginTitle = 'LOGIN'
	loginPage : any = 'LoginPage'
	isLogin = false
	
	constructor(private mainRest: MainRestProvider) {

	}

	convertArrayImageUrlToData(arrayImageUrl) {
		var imageArray = []

		for(let imageUrl of arrayImageUrl){
			var xhr = new XMLHttpRequest();
			xhr.open('GET',imageUrl, true);
			xhr.responseType = 'blob';
			xhr.onload = function(e) {
			  if (this.status == 200) {
			    var myBlob = this.response;

			    var reader = new FileReader();
			 	reader.readAsDataURL(myBlob); 
			 	reader.onloadend = function() {
			 		imageArray.push(reader.result)
			 	} 
			  }
			};
			xhr.send();	
		}

		return imageArray
	}

}
	
