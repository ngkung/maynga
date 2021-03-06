import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {CredentialsModel} from "../models/credentials.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import * as AppConfig from '../app/config';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import {AlertController} from "ionic-angular";
import { Events } from 'ionic-angular';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

    private cfg: any;
    idToken: string;
    refreshSubscription: any;
    message: any;

    constructor(
        public events: Events,
        private storage: Storage,
        private http: HttpClient,
        private alertCtrl: AlertController,
        private jwtHelper:JwtHelperService) {

        this.cfg = AppConfig.cfg;
        this.storage.get('id_token').then(token => {
            this.idToken = token;
        });

    }

    public getToken(): Promise<string> {
        this.storage.get("id_token").then((thetoken)=>{
            if(thetoken){
                return thetoken;
            } else {
                return "Nothing";
            }
        }).catch(e => {
            console.info("token error");
            return null;
        });
        return;
    }


    register(myData: any) {

        return this.http.post(this.cfg.apiUrl + this.cfg.user.register, myData, { responseType: "json"})
            .toPromise()
            .then((data: any) => {
                //console.log(data);
                return data;
                //let rs = data.json();
                /*
                this.saveData(data);
                this.idToken = data.token;
                this.scheduleRefresh();
                */
            })
            .catch(e => console.log("reg error", e));


    }

    login(credentials: CredentialsModel) {
        console.log(credentials);
        return this.http.post(this.cfg.apiUrl + this.cfg.user.login, JSON.stringify(credentials), { responseType: "json"})
            .toPromise()
            .then((data: any) => {
                //let rs = data.json();
                /*
                let alert = this.alertCtrl.create({title: 'Login', message: JSON.stringify(data), buttons: ['Dismiss']});
                alert.present();
                */
                if ((data['status'] == "fail") || (data['status'] == "failed")) {
                    console.log("I am in error!");
                } else {
                    console.log("URL: "+ this.cfg.apiUrl + this.cfg.user.login)
                    console.log(data);
                    this.saveData(data);
                    this.idToken = data.token;
                    this.scheduleRefresh();
                }
                return data;

            })
            .catch(e => {
                let alert = this.alertCtrl.create({title: 'Error', message: e.message, buttons: ['Dismiss']});
                alert.present();
                console.log('login error', JSON.stringify(e))
            });


    }

    forgot(credentials: any) {
        return this.http.post(this.cfg.apiUrl + this.cfg.user.forgot, JSON.stringify(credentials), { responseType: "json"})
            .toPromise()
            .then((data: any) => {
                //console.log(data);
                return data;
                /*
                this.saveData(data);
                this.idToken = data.token;
                this.scheduleRefresh();
                */
            })
            .catch(e => {
                let alert = this.alertCtrl.create({title: 'Error', message: e.message, buttons: ['Dismiss']});
                alert.present();
                console.log('forgot error', JSON.stringify(e))
            });
    }

    saveData(data: any) {

        //let rs = data.json();
        this.storage.set("user", data.user);
        this.storage.set("students", data.students);
        this.storage.set("id_token", data.token);
    }

    logout() {
        // stop function of auto refesh
        this.unscheduleRefresh();
        //this.storage.remove('user');
        //console.log("user removed!");
        this.storage.remove('id_token');
        console.log("id_token removed!");
        this.events.publish("id_token_removed!");

    }

    isValid() {
        return this.jwtHelper.isTokenExpired(this.idToken);
    }


    public getNewJwt() {
        // Get a new JWT from Auth0 using the refresh token saved
        // in local storage
        this.storage.get("id_token").then((thetoken)=>{
            this.http.get(this.cfg.apiUrl + this.cfg.user.refresh+"?Token="+thetoken)
                .subscribe((res: any) => {

                    // deleted .map(res => res.json()) before .subscribe
                    // no need to map again
                    console.log(JSON.stringify(res));
                    console.log(res.status);
                    // If the API returned a successful response, mark the user as logged in
                    // this need to be fixed on Laravel project to retun the New Token ;
                    if(res.status == 'success') {
                        this.storage.set("id_token", res.token);
                    } else {
                        console.log("The Token Black Listed");
                        this.logout();
                    }
                }, err => {
                    console.error('ERROR', err);
                });

        });

    }


    public scheduleRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token

        let source = Observable.of(this.idToken).flatMap(
            token => {
                // The delay to generate in this case is the difference
                // between the expiry time and the issued at time
                let jwtIat = this.jwtHelper.decodeToken(token).iat;
                let jwtExp = this.jwtHelper.decodeToken(token).exp;
                let iat = new Date(0);
                let exp = new Date(0);

                let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
                console.log("will start refresh after :",(delay/1000)/60);
                if(delay-1000<=0)
                    delay = 1;
                return Observable.interval(delay);
            });

        this.refreshSubscription = source.subscribe(() => {
            this.getNewJwt();
        });
    }



    public startupTokenRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        this.storage.get("id_token").then((thetoken)=>{

            if(thetoken){

                let source = Observable.of(thetoken).flatMap(
                    token => {
                        // Get the expiry time to generate
                        // a delay in milliseconds
                        let now: number = new Date().valueOf();
                        try {
                            let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
                            //let jwtExp = this.checkToken(token);
                            let exp: Date = new Date(0);
                            exp.setUTCSeconds(jwtExp);
                            let delay: number = exp.valueOf() - now;
                            console.log((exp.valueOf() - now) / 1000);
                            if(delay <= 0) {
                                delay=1;
                            }
                            // Use the delay in a timer to
                            // run the refresh at the proper time
                            return Observable.timer(delay);
                        } catch (e) {
                            this.logout();
                        }


                    });

                // Once the delay time from above is
                // reached, get a new JWT and schedule
                // additional refreshes
                source.subscribe(() => {
                    this.getNewJwt();
                    this.scheduleRefresh();
                });

            }else{
                //there is no user logined
                console.info("there is no user logined ");
            }

        }).catch( e => {
            this.logout();
            console.log(JSON.stringify(e));
        });


    }

    checkToken(token){
        try {
            let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
            return jwtExp;
        } catch (e) {
            this.logout();
            console.log(JSON.stringify(e));
        }
    }


    getLatestInfo() {

        return this.http.post(this.cfg.apiUrl + "/api/getApiContent",{},{}).toPromise()
            .then((data: any) => {
                //console.log(data);
                return JSON.parse(data);

            })
            .catch(e => {
                //let alert = this.alertCtrl.create({title: 'Error', message: e.message, buttons: ['Dismiss']});
                //alert.present();
                //this.logout();
                console.log('getInfo error', JSON.stringify(e))
            });
    }

    getRecords(id: number) {

        let info = {};
        info["id"] = id;

        return this.http.post(this.cfg.apiUrl + "/api/getStudentRecords",JSON.stringify(info),{}).toPromise()
            .then((data: any) => {
                //let alert = this.alertCtrl.create({title: 'Good la', message: " welcome ", buttons: ['Dismiss']});
                //alert.present();

                //console.log(JSON.parse(data.schoolRecords));
                //console.log(JSON.parse(data.bookRecords));
                //return JSON.parse(data.schoolRecords);
                return data;

            })
            .catch(e => {
                let alert = this.alertCtrl.create({title: 'Error', message: e.message, buttons: ['Dismiss']});
                alert.present();
                console.log('get record error', JSON.stringify(e))
            });
    }


    public unscheduleRefresh() {
// Unsubscribe fromt the refresh
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

  }
