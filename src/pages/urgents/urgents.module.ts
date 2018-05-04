import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UrgentsPage } from './urgents';

@NgModule({
  declarations: [
    UrgentsPage,
  ],
  imports: [
    IonicPageModule.forChild(UrgentsPage),
  ],
})
export class UrgentsPageModule {}
