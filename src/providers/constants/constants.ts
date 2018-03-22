

import { Injectable } from '@angular/core';

// Global Variables

export var CMS_PAGES : Array<{id: any, name: '', alias: '', page: any}> = [];
export var SOCIAL_LINKS = { facebook :'', twitter: '', google: ''};


// public header

export let PUBLIC_HEADER = {
	'_token' : 'RBiTo3vXuK0R69g5Alw8FNLnOrN1yaqW55tydKqo'
}


// Constants for Web Services
export let BASE_URL = "http://192.168.0.36/BaliTours/public/api/";

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



export let API_HEADER = {
							
						};


@Injectable()
export class ConstantsProvider 
{

	
	
}
