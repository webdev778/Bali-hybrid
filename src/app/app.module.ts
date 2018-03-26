import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { GoogleMaps } from '@ionic-native/google-maps';

import { IonicStorageModule } from '@ionic/storage';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { BuyTravelPassPage } from '../pages/buy-travel-pass/buy-travel-pass';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { FaqPage } from '../pages/faq/faq';
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

import { BscHeaderPage } from '../pages/bsc-header/bsc-header';
import { BscFooterPage } from '../pages/bsc-footer/bsc-footer';


import { RestProvider } from '../providers/rest/rest';
import { MainRestProvider } from '../providers/rest/mainrest';
import { ConstantsProvider } from '../providers/constants/constants';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutUsPage,
    BuyTravelPassPage,
    ContactUsPage,
    FaqPage,
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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {
        links: [
          { component: HomePage, name: 'Home', segment: 'home' },
          { component: ServicesPage, name: 'ServicesPage', segment: 'services' },
          { component: ContactUsPage, name: 'ContactUsPage', segment: 'contactus' },
          { component: InBaliPage, name: 'InBaliPage', segment: 'todayinbali' },
          { component: FaqPage, name: 'FaqPage', segment: 'faq' },
          { component: BuyTravelPassPage, name: 'BuyTravelPassPage', segment: 'buytravelpass' },
          { component: LoginPage, name: 'LoginPage', segment: 'login'},
          { component: ServiceDetailsPage, name: 'ServiceDetailsPage', segment: 'services/:service' , defaultHistory:[ServicesPage]},
          { component: PageBankPage, name: 'PageBankPage', segment: 'banks' , defaultHistory:[InBaliPage]},
          { component: PageAtmsPage, name: 'PageAtmsPage', segment: 'atms' , defaultHistory:[InBaliPage]},
          { component: ExchangeRatePage, name: 'ExchangeRatePage', segment: 'exchangerate' , defaultHistory:[InBaliPage]},
          { component: VolcanoStatusPage, name: 'VolcanoStatusPage', segment: 'volcanostatus' , defaultHistory:[InBaliPage]},
          { component: VaccinationPage, name: 'VaccinationPage', segment: 'vaccination' , defaultHistory:[InBaliPage]},
          { component: AboutUsPage, name: 'AboutUsPage', segment: 'page/:data' , defaultHistory:[InBaliPage]},
          { component: CommonMapPage, name: 'CommonMapPage', segment: 'map/:location' , defaultHistory:[HomePage]},
        ]
    }),
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
