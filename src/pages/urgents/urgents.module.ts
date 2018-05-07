import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UrgentsPage } from './urgents';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UrgentsPage,
  ],
    imports: [
        IonicPageModule.forChild(UrgentsPage),
        TranslateModule.forChild(),
    ],
    providers: [
    ],
    exports:[
    ],
})
export class UrgentsPageModule {}
