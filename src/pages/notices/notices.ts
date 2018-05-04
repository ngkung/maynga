import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

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
    options: DocumentViewerOptions = {
        title: '通告'
    }

  constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public document: DocumentViewer,
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
      this.document.viewDocument(link, 'application/pdf', this.options);

  }
}


