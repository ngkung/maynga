import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserModel} from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public user: UserModel;
    public message: any;
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage) {
        this.selectedItem = navParams.get('item');

        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];

        this.items = [
            {title: 'homeItem.notice', note: '>', icon: 'notifications'},
            {title: 'homeItem.urgent', note: '>', icon: 'warning'}
        ];
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
        this.menuCtrl.enable(true);
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(HomePage, {
            item: item
        });
    }
}
