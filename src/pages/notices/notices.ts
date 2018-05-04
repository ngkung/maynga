import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { FileOpener } from "@ionic-native/file-opener";

/**
 * Generated class for the NoticesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html',
})
export class NoticesPage {
  notices: any;

  constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public fileOpener: FileOpener,
      public navParams: NavParams) {

      this.notices = this.navParams.get('notices');
      if (this.notices != null) {
          if (this.notices.length > 0) {
          }
      } else {
          this.navCtrl.setRoot('HomePage');
      }

      console.log(this.notices);

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NoticesPage');
      this.menuCtrl.enable(false);
  }

  openFile(link) {
      console.log("Someone touch me!");
      this.fileOpener.open(link, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
  }
}
