import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/authService";

/**
 * Generated class for the AlbumsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html',
})
export class AlbumsPage {

    public albums: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public authService: AuthService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AlbumsPage');
      this.getLatestInfo();
  }

    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }

    getLatestInfo() {
        console.log("albums searching ... ");
        this.authService.getLatestInfo().then( data => {
                //console.log(JSON.parse(data));
                let albums = [];
                for (let key in data) {
                    if (data[key].contentType == 'album') {
                        albums.push(data[key].blobJson);
                    }
                }

                if (albums.length > 0) {
                    this.albums = albums;
                }

                console.log(this.albums);
            }
        );
    }

    showDetails(album) {
      console.log("clicking me ");
        this.navCtrl.push('AlbumDetailsPage', {
            album: album
        });
    }
}
