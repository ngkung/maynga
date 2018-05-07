import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';

/**
 * Generated class for the UrgentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-urgents',
  templateUrl: 'urgents.html',
})
export class UrgentsPage {

  urgents: any;

  constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public navParams: NavParams) {

      this.urgents = this.navParams.get('urgents');
      if (this.urgents != null) {
          console.log(this.urgents);
          if (this.urgents.length > 0) {
          }
      } else {
          this.navCtrl.setRoot('HomePage');
      }

      console.log(this.urgents);
  }

  ionViewDidLoad() {
      this.menuCtrl.enable(false);
  }

}
