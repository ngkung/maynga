import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProtectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class ProtectedPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storage: Storage) {
    }

  ionViewDidLoad() {
      this.storage.get('id_token').then(id_token => {
          if (id_token === null) {
              console.log("Did it");
              this.navCtrl.setRoot('LoginPage');
              return false;
          }
      });
      return;
  }



}
