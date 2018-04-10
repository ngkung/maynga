import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordsPage } from './records';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    RecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordsPage),
      TranslateModule.forChild(),
      ComponentsModule
  ],
    exports:[
        ComponentsModule
    ]
})
export class RecordsPageModule {}
