import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthService} from '../providers/authService';
import {ComponentsModule} from "../components/components.module";

let storage = new Storage({});

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
    return storage.get('id_token');
}

/*
export function getAuthHttp(http) {
    return new AuthHttp(new AuthConfig({
        noJwtError: true,
        globalHeaders: [{'Accept': 'application/json'},{'Authorization': 'Bearer '+storage.get('id_token')}],
        tokenGetter: (() => storage.get('id_token')),
    }), http);
}
*/

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot(),
      HttpClientModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient]
          }
      }),
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['maynga01.no-ip.org:8008'],
              blacklistedRoutes: ['maynga01.no-ip.org:8008/apilogin'],
              headerName: 'Authorization',
          }
      }),
      ComponentsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
      JwtHelperService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
      ComponentsModule

  ]
})
export class AppModule {}
