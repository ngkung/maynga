import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumDetailsPage } from './album-details';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AlbumDetailsPage,
  ],
  imports: [
      IonicPageModule.forChild(AlbumDetailsPage),
      TranslateModule.forChild(),

  ],
})
export class AlbumDetailsPageModule {}
