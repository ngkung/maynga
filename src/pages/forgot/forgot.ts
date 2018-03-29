import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from "../../providers/authService";

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
        public authService: AuthService) {

        this.forgotData = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required])],
        });

    }

    forgot() {
        this.authService.forgot(this.forgotData.value)
            .then(() => this.redirectToHome())
            .catch(e => console.log("forgot me error", e));
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
