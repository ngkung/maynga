import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from "../../providers/authService";


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
        public authService: AuthService) {

        this.registerData = this.formBuilder.group({
            initLogin: ['', Validators.compose([Validators.required])],
            initPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            email: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });

    }

    register() {
        this.authService.forgot(this.registerData.value)
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
