import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the AlbumDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-album-details',
  templateUrl: 'album-details.html',
})
export class AlbumDetailsPage {

  album: Array<{id: number, title: string, contentType: string, publishDate: string, offlineDate: string, status: string, photos: any}>;
  keys: any;

  constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public navParams: NavParams) {

      let album = this.navParams.get('album');
      this.keys = null;
      if (album != null) {
          this.album = album;
          this.keys = Object.keys(album.photos);
          console.log(this.keys);
      } else {
          this.navCtrl.setRoot('HomePage');
      }

  }

    ionViewWillEnter() {
        if (this.album == null) {
            this.navCtrl.setRoot('HomePage');
        }
    }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
    //console.log('ionViewDidLoad AlbumDetailsPage');
  }

}
