import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from "../../providers/authService";
import {UserModel} from '../../models/user.model';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    private loginData: FormGroup;
    public user: UserModel;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public formBuilder: FormBuilder,
        public authService: AuthService) {

        this.storage.get('user').then(user => {
            this.user = user;
        });


            this.loginData = this.formBuilder.group({
                email: ['', Validators.compose([Validators.required])],
                password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            });




    }

    ionViewDidLoad() {
        //hide menu when on the login page, regardless of the screen resolution
        console.log("login page");
        this.menuCtrl.enable(false);
    }

    login() {
        //use this.loginData.value to authenticate the user
        this.authService.login(this.loginData.value)
            .then(() => this.redirectToHome())
            .catch(e => console.log("login error", e));
    }

    logout() {
        console.log("calling from me logout");
        //this.authService.logout();
    }

    redirectToHome() {
        console.log("Redirecting");
        this.navCtrl.setRoot('HomePage');
        this.menuCtrl.enable(true);
    }

    /**
     * Opens a page
     *
     * @param page string Page name
     */
    openPage(page: string) {
        console.log("open from login");
        this.navCtrl.push(page);
    }
}
