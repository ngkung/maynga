import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticesPage } from './notices';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";
import {DocumentViewer} from "@ionic-native/document-viewer";

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
        DocumentViewer
    ],
    exports:[
        ComponentsModule,
    ]
})
export class NoticesPageModule {
}
