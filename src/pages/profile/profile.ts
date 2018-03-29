import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {ProtectedPage} from "../protected/protected";
import {Storage} from '@ionic/storage';
import {UserModel} from '../../models/user.model';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage extends ProtectedPage {

    public user: UserModel;
    public message: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage) {

        super(navCtrl, navParams, storage);

        this.storage.get('user').then(user => {
            this.user = user;
        });

    }

    ionViewDidLoad() {
        this.storage.get('id_token').then(id_token => {
            if (id_token === null) {
                console.log("Profile do it");
                this.navCtrl.setRoot('LoginPage');
                return false;
            }
        });
        this.menuCtrl.enable(true);
    }


}
