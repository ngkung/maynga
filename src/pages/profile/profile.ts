import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {ProtectedPage} from "../protected/protected";
import {Storage} from '@ionic/storage';
import {StudentModel, UserModel} from '../../models/user.model';
import {AuthService} from "../../providers/authService";

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage extends ProtectedPage {

    public user: UserModel;
    public students: Array<StudentModel>;
    public message: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public authService: AuthService) {

        super(navCtrl, navParams, storage);

        this.storage.get('user').then(user => {
            this.user = user;
        });
        this.storage.get('students').then(students => {
            this.students = students;
            /*
            Object.keys(students).forEach(key=>{
                console.log(students[key]);
            });
            */
            //console.log("Home students: "+JSON.stringify(students));
        });
    }

    ionViewDidLoad() {
        this.storage.get('id_token').then(id_token => {
            if (id_token === null) {
                console.log("Profile do it");
                this.navCtrl.setRoot('LoginPage');
                return false;
            } else {
                this.getRecords(1);
            }
        });
        this.menuCtrl.enable(true);
    }

    getRecords(id: number) {
        this.authService.getRecords(id)
            .then(() => this.sayHi())
            .catch(e => console.log("get profile records error", e));
    }

    sayHi() {
        console.log("saying hi");
    }


}
