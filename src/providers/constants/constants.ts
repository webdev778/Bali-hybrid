

import { Injectable } from '@angular/core';

// Global Variables

export var CMS_PAGES : Array<{id: any, name: '', alias: '', page: any}> = [];
export var SOCIAL_LINKS = { facebook :'', twitter: '', google: ''};
export let GOOGLE_KEY = "AIzaSyCecgk4WWZR2HgSmSczljuNDqQaJyd8psg";


// public header

export let PUBLIC_HEADER = {
	
}




// Constants for Web Services


export let BASE_URL = "http://192.168.0.24/BaliTours/public/api/";
// export let BASE_URL = "http://admin.balisupport.tk/api/";



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

// Dashboard
export let SERVICE_URL_UPDATE_DASHBOARD = BASE_URL+"updateDashboard";



export let API_HEADER = {
							
						};

export interface TicketStructure  
{ 
	ticket_id: number, 
	quantity: number, 
	price: number,
	ticket_type: string
}

export interface TravellersInfoDS
{
	name: string,
	date_of_birth: string,
	gender: string
}

export interface UserDetailsDS
{ 
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


@Injectable()
export class ConstantsProvider 
{
	loginTitle = 'LOGIN'
	loginPage : any = 'LoginPage'
	
	constructor() {

	}
	
}
