import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { TrocaDiscoApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { DiscoverPage } from '../pages/discover/discover';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { DiscDetailPage } from '../pages/disc-detail/disc-detail';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { TrocaDiscoData } from '../providers/troca-disco-data';
import { UserData } from '../providers/user-data';


@NgModule({
  declarations: [
    TrocaDiscoApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    DiscoverPage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    DiscDetailPage,
    SearchPage,
    TabsPage,
    TutorialPage,
    SupportPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(TrocaDiscoApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: DiscoverPage, name: 'Discover', segment: 'discover' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SearchPage, name: 'Search', segment: 'search' },
        { component: DiscDetailPage, name: 'DiscDetail', segment: 'discDetail/:discId' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TrocaDiscoApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    DiscoverPage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    DiscDetailPage,
    SearchPage,
    TabsPage,
    TutorialPage,
    SupportPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TrocaDiscoData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
