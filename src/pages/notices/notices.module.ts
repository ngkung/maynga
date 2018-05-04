import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticesPage } from './notices';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";
import { FileOpener } from "@ionic-native/file-opener";

@NgModule({
  declarations: [
    NoticesPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticesPage),
      TranslateModule.forChild(),
      ComponentsModule,
  ],
    providers: [
        FileOpener,
    ],
    exports:[
        ComponentsModule,
    ]
})
export class NoticesPageModule {
}
