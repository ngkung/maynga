import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from "../../providers/authService";
import {AlertController} from "ionic-angular";
import { TranslateService } from '@ngx-translate/core';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    private registerData: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public formBuilder: FormBuilder,
        public alertCtrl: AlertController,
        public translate: TranslateService,
        public authService: AuthService) {

        this.registerData = this.formBuilder.group({
            initLogin: ['', Validators.compose([Validators.required])],
            initPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            email: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.email])],
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });

    }

    register() {
        if (this.registerData.getRawValue().password === this.registerData.getRawValue().confirmPassword) {
            this.authService.register(this.registerData.value)
                .then((data) => {
                    //this.redirectToHome()
                    let title = this.translate.instant("register."+data['status']);
                    let message = this.translate.instant("register."+data['message']);
                    let butName = this.translate.instant("register.return");
                    let alert = this.alertCtrl.create({title: title, message: message, buttons: [butName]});
                    alert.present();

                    if (data['status'] == "failed") {
                        console.log("register failed: " + data['message']);

                    } else if (data['status'] == "success"){
                        console.log("register success");
                        this.redirectToHome();

                    }

                })
                .catch(e => {
                    console.log("forgot me error", e)
                });
        } else {
            this.registerData.controls['password'].setValue('');
            this.registerData.controls['confirmPassword'].setValue('');
            let alert = this.alertCtrl.create({title: '錯誤 Error', message: '密碼確認錯誤，請重新輸入! Please enter matched passwords again!', buttons: ['Dismiss']});
            alert.present();
        }
        /*
        this.authService.register(this.registerData.value)
            .then(() => {
                //this.redirectToHome()
                console.log("Returned");
            })
            .catch(e => {
                console.log("forgot me error", e)
            });
            */
    }

    ionViewDidLoad() {
        this.menuCtrl.enable(false);
    }

    redirectToHome() {
        console.log("Redirecting");
        this.navCtrl.setRoot('LoginPage');
        this.menuCtrl.enable(false);
    }

}
