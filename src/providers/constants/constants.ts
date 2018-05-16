import { Injectable } from '@angular/core';
// import{ AlertController,NavController } from 'ionic-angular';
// import { LoginPage } from '../../pages/login/login'

// Global Variables

export var CMS_PAGES : Array<{id: any, name: '', alias: '', page: any}> = [];
export var SOCIAL_LINKS = { facebook :'', twitter: '', google: ''};
export let GOOGLE_KEY = "AIzaSyCecgk4WWZR2HgSmSczljuNDqQaJyd8psg";

// public header

export let PUBLIC_HEADER = {
	
}

// Constants for Web Services

// export let BASE_URL = "http://192.168.0.34/balisupport2/public/api/";
export let BASE_URL = "http://admin.balisupport.tk/api/";

//Authenticate User

export let SERVICE_URL_AUTHENTICATE_USER = BASE_URL + "authenticateUser"

// Login Page
export let SERVICE_URL_LOGIN = BASE_URL+"login";
export let SERVICE_URL_SOCIAL_LOGIN = BASE_URL + "socialMediaRegister"
export let SERVICE_URL_SIGNUP = BASE_URL+"signup";
export let SERVICE_URL_FORGET_PASSWORD = BASE_URL+ "forgetPassword"
export let SERVICE_URL_LOGOUT = BASE_URL + "logout"

// BSC Footer
export let SERVICE_URL_SOCIAL_LINK = BASE_URL+"getSocialLinks";

//change Password
export let SERVICE_URL_CHANGE_PASSWORD = BASE_URL+"changePassword"

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
export let SERVICE_URL_GET_TICKETS = BASE_URL + "gettickets";
export let SERVICE_URL_UPDATE_TICKET_PROFILE = BASE_URL + "updateTicketInfo";
export let SERVICE_URL_GET_TICKET_INFORMATION = BASE_URL + "getTicketInformation";
export let SERVICE_URL_ACTIVATE_TICKET = BASE_URL + "activateTicket";
export let SERVICE_URL_VIEW_ORDER_HISTORY = BASE_URL + "viewOrderHistory";
export let SERVICE_URL_VIEW_PROFILE = BASE_URL + "viewProfile";
export let SERVICE_URL_UPDATE_PROFILE = BASE_URL + "updateProfile";
export let SERVICE_URL_GET_SERVICE_CONTENT = BASE_URL + "getServiceContent";
export let SERVICE_URL_UPDATE_PASSWORD = BASE_URL + "updatePassword";

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
	error_dob : string
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

	authToken = ""
	
	constructor() {
	}
	
	validateDate(date: string, type) {
		let arrayDateString = date.split("/")

		if (arrayDateString.length != 3)
		{
			return "Please enter a valid date (mm/dd/yyyy)"
		}else if (Number(arrayDateString[0]) > 12 ||  Number(arrayDateString[1]) > 31 || Number(arrayDateString[2]) < 1000)
		{
			return "Please enter a valid date (mm/dd/yyyy)"
		}else if ( type != 'Family')
		{
			if (new Date(date))
			{
				let enteredDate = new Date(date).getTime()
				let currentDate = new Date().getTime()

				if (enteredDate > currentDate)
				{
					return "Please enter a valid date (mm/dd/yyyy)"
				}else {
					let years = (currentDate - enteredDate)/(1000*60*60*24*365.25)
					if ( type == 'Adult')
					{
						if ( years < 18)
						{
							return "Adult age must be greater than 18 years"

						}else{
							return ""
						}
					}else{
						if ( years > 18)
						{
							return "Child age must be less than 18 years"

						}else{
							return ""
						}
					}
				}
			}else {
				return "Please enter a valid date (mm/dd/yyyy)"
			}
		}else {
			return ""
		}
	}
}
