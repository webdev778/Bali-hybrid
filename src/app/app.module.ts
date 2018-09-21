import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { GoogleMaps } from '@ionic-native/google-maps';

import { IonicStorageModule } from '@ionic/storage';

import { BrMaskerModule } from 'brmasker-ionic-3';

import { FacebookModule } from 'ngx-facebook';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { BuyTravelPassPage } from '../pages/buy-travel-pass/buy-travel-pass';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { FaqPage } from '../pages/faq/faq';
import { FavouritesPage } from '../pages/favourites/favourites';
import { InBaliPage } from '../pages/in-bali/in-bali';
import { LoginPage } from '../pages/login/login';
import { ServicesPage } from '../pages/services/services';
import { ServiceDetailsPage } from '../pages/service-details/service-details';
import { ExchangeRatePage } from '../pages/exchange-rate/exchange-rate';
import { VolcanoStatusPage } from '../pages/volcano-status/volcano-status';
import { VaccinationPage } from '../pages/vaccination/vaccination';
import { CommonMapPage } from '../pages/common-map/common-map';
import { PageBankPage } from '../pages/page-bank/page-bank';
import { PageAtmsPage } from '../pages/page-atms/page-atms';
import { PublicHolidaysPage } from '../pages/public-holidays/public-holidays';
import { TravelAlertPage } from '../pages/travel-alert/travel-alert';
import { WeatherPage } from '../pages/weather/weather';
import { SimCardPage } from '../pages/simcard/simcard';
import { AccountPage } from '../pages/account/account';
import { DocumentPage } from '../pages/document/document';
import { ContactPage } from '../pages/contact/contact';
import { AtmBankLocationPage } from '../pages/atmbank-location/atmbank-location';
//import { TravelAlertPage } from '../pages/travel-alert/travel-alert';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TicketDetailsPage } from '../pages/ticket-details/ticket-details'
import { BscHeaderPage } from '../pages/bsc-header/bsc-header';
import { BscFooterPage } from '../pages/bsc-footer/bsc-footer';
import { ActivationPage } from '../pages/activation/activation'
import { RestProvider } from '../providers/rest/rest';
import { MainRestProvider } from '../providers/rest/mainrest';
import { ConstantsProvider } from '../providers/constants/constants';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DashboardTicketsPage } from '../pages/dashboard-tickets/dashboard-tickets'
import { PaymentStatusPage } from '../pages/payment-status/payment-status'
import { OrderHistoryPage } from '../pages/order-history/order-history'
import { ViewProfilePage } from '../pages/view-profile/view-profile'
import { ResetPasswordPage } from '../pages/reset-password/reset-password'
import { UpdatePasswordPage } from '../pages/update-password/update-password'
import { HelpDeskPage } from '../pages/help-desk/help-desk'
import { MedicalAssistancePage } from '../pages/medical-assistance/medical-assistance'
import { MedicalDetailsPage } from '../pages/medical-details/medical-details'
import { MedicalLocationPage } from '../pages/medical-location/medical-location'
import { ImageViewPage } from '../pages/image-view/image-view'

 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutUsPage,
    BuyTravelPassPage,
    ContactUsPage,
    FaqPage,
    FavouritesPage,
    InBaliPage,
    LoginPage,
    ServicesPage,
    ServiceDetailsPage,
    ExchangeRatePage,
    VolcanoStatusPage,
    VaccinationPage,
    BscHeaderPage,
    BscFooterPage,
    CommonMapPage,
    PageBankPage,
    PageAtmsPage,
    PublicHolidaysPage,
    WeatherPage,
    SimCardPage,
    AccountPage,
    DocumentPage,
    ContactPage,
    AtmBankLocationPage,
    TravelAlertPage,
    DashboardPage,
    TicketDetailsPage,
    ResetPasswordPage,
    ActivationPage,
    DashboardTicketsPage,
    PaymentStatusPage,
    ViewProfilePage,
    OrderHistoryPage,
    UpdatePasswordPage,
    HelpDeskPage,
    MedicalAssistancePage,
    MedicalDetailsPage,
    MedicalLocationPage,
    ImageViewPage
  ],
  imports: [
    BrowserModule,
    BrMaskerModule,
    FacebookModule.forRoot(),
    IonicModule.forRoot(MyApp, {}, {
        links: [
          { component: HomePage, name: 'HomePage', segment: 'Home' },
          { component: DashboardPage, name: 'Dashboard', segment: 'dashboard' },
          { component: ServicesPage, name: 'ServicesPage', segment: 'services' },
          { component: ContactUsPage, name: 'ContactUsPage', segment: 'contactus' },
          { component: InBaliPage, name: 'InBaliPage', segment: 'todayinbali' },
          { component: FaqPage, name: 'FaqPage', segment: 'faq' },
          { component: FavouritesPage, name: 'FavouritesPage', segment: 'favourites' },
          { component: BuyTravelPassPage, name: 'BuyTravelPassPage', segment: 'buytravelpass' },
          { component: LoginPage, name: 'LoginPage', segment: 'login'},
          { component: ServiceDetailsPage, name: 'ServiceDetailsPage', segment: 'services/details/:service' , defaultHistory:[ServicesPage]},
          { component: PageBankPage, name: 'PageBankPage', segment: 'banks' , defaultHistory:[InBaliPage]},
          { component: PageAtmsPage, name: 'PageAtmsPage', segment: 'atms' , defaultHistory:[InBaliPage]},
          { component: ExchangeRatePage, name: 'ExchangeRatePage', segment: 'exchangerate' , defaultHistory:[InBaliPage]},
          { component: VolcanoStatusPage, name: 'VolcanoStatusPage', segment: 'volcanostatus' , defaultHistory:[InBaliPage]},
          { component: VaccinationPage, name: 'VaccinationPage', segment: 'vaccination' , defaultHistory:[InBaliPage]},
          { component: PublicHolidaysPage, name: 'PublicHolidaysPage', segment: 'publicholidays' , defaultHistory:[InBaliPage]},
          { component: TravelAlertPage, name: 'TravelAlertPage', segment: 'travelalert' , defaultHistory:[InBaliPage]},
          { component: WeatherPage, name: 'WeatherPage', segment: 'weather' , defaultHistory:[InBaliPage]},
          { component: SimCardPage, name: 'SimCardPage', segment: 'simcard' , defaultHistory:[InBaliPage]},
          { component: AccountPage, name: 'AccountPage', segment: 'account' },
          { component: DocumentPage, name: 'DocumentPage', segment: 'document'},
          { component: ContactPage, name: 'ContactPage', segment: 'contact' },
          { component: AtmBankLocationPage, name: 'AtmBankLocationPage', segment: 'atmbank-location' , defaultHistory:[InBaliPage]},
          { component: AboutUsPage, name: 'AboutUsPage', segment: 'page/:data' , defaultHistory:[InBaliPage]},
          { component: CommonMapPage, name: 'CommonMapPage', segment: 'map/:location' , defaultHistory:[HomePage]},
          { component: ActivationPage, name: 'ActivationPage', segment: 'activation/:data'},
          { component: ResetPasswordPage, name: 'ResetPasswordPage', segment: 'resetpassword/:data'},
          { component: DashboardTicketsPage , name: 'DashboardTicketsPage', segment: 'dashboard/dashboardtickets', defaultHistory: [DashboardPage]},
          { component: ViewProfilePage , name: 'ViewProfilePage', segment: 'dashboard/viewprofile', defaultHistory: [DashboardPage]},
          { component: OrderHistoryPage , name: 'OrderHistoryPage', segment: 'dashboard/orderhistory', defaultHistory: [DashboardPage]},
          { component: TicketDetailsPage , name: 'TicketDetailsPage', segment: 'dashboard/dashboardtickets/ticketdetails/:ticket', defaultHistory: [DashboardPage,DashboardTicketsPage]},
          { component: UpdatePasswordPage , name: 'UpdatePasswordPage', segment: 'dashboard/viewprofile/update-password', defaultHistory: [DashboardPage,ViewProfilePage]},
          { component: HelpDeskPage , name: 'HelpDeskPage', segment: 'services/helpdesk/:id', defaultHistory: [ServicesPage]},
          { component: MedicalAssistancePage , name: 'MedicalAssistancePage', segment: 'services/medical-assistance', defaultHistory: [ServicesPage]},
          { component: MedicalLocationPage , name: 'MedicalLocationPage', segment: 'services/medical-assistance/medical-location/:id', defaultHistory: [ServicesPage,MedicalAssistancePage]},
          { component: MedicalDetailsPage , name: 'MedicalDetailsPage', segment: 'services/medical-assistance/medical-location/details/:id', defaultHistory: [ServicesPage,MedicalAssistancePage]},
          { component: ImageViewPage , name: 'ImageViewPage', segment: 'dashboard/dashboardtickets/ticketdetails/viewimage/:image', defaultHistory: [DashboardPage] },
         
]}),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutUsPage,
    BuyTravelPassPage,
    ContactUsPage,
    FaqPage,
    FavouritesPage,
    InBaliPage,
    LoginPage,
    ServicesPage,
    ServiceDetailsPage,
    ExchangeRatePage,
    VolcanoStatusPage,
    VaccinationPage,
    BscHeaderPage,
    BscFooterPage,
    CommonMapPage,
    PageBankPage,
    PageAtmsPage,
    PublicHolidaysPage,
    WeatherPage,
    SimCardPage,
    AccountPage,
    ContactPage,
    DocumentPage,
    AtmBankLocationPage,
    TravelAlertPage,
    DashboardPage,
    TicketDetailsPage,
    ActivationPage,
    ResetPasswordPage,
    DashboardTicketsPage,
    PaymentStatusPage,
    ViewProfilePage,
    OrderHistoryPage,
    UpdatePasswordPage,
    HelpDeskPage,
    MedicalAssistancePage,
    MedicalLocationPage,
    MedicalDetailsPage,
    ImageViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps,
    RestProvider,
    MainRestProvider,
    ConstantsProvider,
   
   ]
})
export class AppModule {}
