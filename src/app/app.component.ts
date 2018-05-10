import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../providers/authService';
import { Events } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = 'HomePage';

    pages: Array<{title: string, icon: string, component: any, method?: any}>;


    constructor(
        public events: Events,
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public authService: AuthService,
        public fcm: FCM,
        translate: TranslateService) {

        this.initializeApp();

        translate.setDefaultLang('hk');

      // used for an example of ngFor and navigation

        this.pages = [
            {title: 'page.home', icon: 'home',component: 'HomePage'},
            {title: 'page.profile', icon: 'people', component: 'ProfilePage'},
            {title: 'page.albums', icon: 'albums', component: 'AlbumsPage'},
            {title: 'page.logout', icon: 'log-out', component: 'LoginPage', method: 'logout'}
        ];

        events.subscribe('id_token_removed!', () => {
           this.nav.setRoot('LoginPage');
        });

    }

    initializeApp() {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.

          /*
          this.fcm.subscribeToTopic('marketing');

          //https://javebratt.com/ionic-push-notification/
          //https://ionicframework.com/docs/native/fcm/
          //https://cordova-plugin-fcm.appspot.com/

          this.fcm.getToken().then(token => {
              //backend.registerToken(token);
          });

          this.fcm.onNotification().subscribe(data => {
              if(data.wasTapped){
                console.log("Received in background");
                //Notification was received on device tray and tapped by the user.
                    console.log(JSON.stringify(data));
                 this.nav.setRoot('DetailPage', { profileId: data.profileId });
              } else {
                console.log("Received in foreground");
                //Notification was received in foreground. Maybe the user needs to be notified.
                console.log(JSON.stringify(data));
                this.nav.push('DetailPage', { profileId: data.profileId });
              };
            });

            this.fcm.onTokenRefresh().subscribe(token => {
              //backend.registerToken(token);
            });

        this.fcm.unsubscribeFromTopic('marketing');
        */


        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.authService.startupTokenRefresh();



      });

    }

    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
        if (page.method== 'logout') {
            this.authService.logout();
        }
      this.nav.setRoot(page.component);
    }






}
