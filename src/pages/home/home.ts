import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {StudentModel, UserModel} from '../../models/user.model';
import {AuthService} from "../../providers/authService";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public user: UserModel;
    public students: Array<StudentModel>;
    public message: any;
    public notices: any;
    public urgents: any;
    public albums: any;
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public authService: AuthService) {
        this.selectedItem = navParams.get('item');

        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];

        /*
        this.items = [
            {title: 'homeItem.notice', note: '', icon: 'notifications'},
            {title: 'homeItem.urgent', note: '', icon: 'warning'}
        ];
        */

        this.items = [{title: 'homeItem.urgent', note: '', icon: 'loading'}];

        this.storage.get('students').then(students => {
            this.students = students;
            /*
            Object.keys(students).forEach(key=>{
                console.log(students[key]);
            });
            */
            //console.log("Home students: "+JSON.stringify(students));
        });
        /*
        for (let i = 1; i < 4; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: '>',
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
        */
    }

    ionViewDidLoad() {
        this.storage.get('id_token').then(id_token => {
            if (id_token === null) {
                console.log("Home do it");
                this.navCtrl.setRoot('LoginPage');
                return false;
            } else {
                //this.getLatestInfo(id_token);
            }
        });
        this.getLatestInfo();

    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }

    itemTapped(item) {
        // That's right, we're pushing to ourselves!
        /*
        this.navCtrl.push(HomePage, {
            item: item
        });
        */

        if (item.title == 'homeItem.notice') {
            //console.log(this.notices);
            this.navCtrl.push('NoticesPage', {
                notices: this.notices
            });
        } else if (item.title == 'homeItem.urgent') {
            this.navCtrl.push('UrgentsPage', {
                urgents: this.urgents
            });
        }
    }

    getLatestInfo() {
        console.log("trying to get info now");
        this.authService.getLatestInfo().then( data => {
                //console.log(JSON.parse(data));
                this.items = [];
                let notices = [];
                let urgents = [];
                let albums = [];
                for (let key in data) {
                    if (data[key].contentType == "notice") {
                        notices.push(data[key].blobJson);
                    } else if (data[key].contentType == 'urgent') {
                        urgents.push(data[key].blobJson);
                    } else if (data[key].contentType == 'album') {
                        albums.push(data[key].blobJson);
                    }
                }

                if (notices.length > 0) {
                    this.notices = notices;
                    this.items.push({title: 'homeItem.notice', note: '', icon: 'notifications'});
                }

                if (urgents.length > 0) {
                    this.urgents = urgents;
                    this.items.push({title: 'homeItem.urgent', note: '', icon: 'warning'});
                }

                if (albums.length > 0) {
                    this.albums = albums;
                }
            }
        );
    }


}
