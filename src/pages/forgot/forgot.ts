import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from "../../providers/authService";
import {AlertController} from "ionic-angular";
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from "ionic-angular";
/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

    private forgotData: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public formBuilder: FormBuilder,
        public alertCtrl: AlertController,
        public translate: TranslateService,
        public loadingCtrl: LoadingController,
        public authService: AuthService) {

        this.forgotData = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required])],
        });

    }

    forgot() {
        let loadingMsg = this.translate.instant("register.loading");
        let loading = this.loadingCtrl.create({
            content: loadingMsg
        });
        loading.present();
        this.authService.forgot(this.forgotData.value)
            .then((data) => {
                loading.dismissAll();
                console.log(data);
                let title = this.translate.instant("forget.title_"+data['status']);
                let message = this.translate.instant("forget."+data['message']);
                let butName = this.translate.instant("register.return");
                let alert = this.alertCtrl.create({title: title, message: message, buttons: [butName]});
                alert.present();

                if (data['status'] == "failed") {
                    console.log("forget failed: " + data['message']);
                } else {
                    this.redirectToHome();
                }

            })
            .catch(e => {
                loading.dismissAll();
                console.log("forgot me error", e);
            });
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
