import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumsPage } from './albums';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    AlbumsPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumsPage),
      TranslateModule.forChild(),
      ComponentsModule,
  ],
    providers: [
    ],
    exports:[
        ComponentsModule,
    ]
})
export class AlbumsPageModule {}
