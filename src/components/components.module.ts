import { NgModule } from '@angular/core';
import { AccordionListComponent } from './accordion-list/accordion-list';
import { IonicModule } from 'ionic-angular';


export const components = [
    AccordionListComponent,
];
@NgModule({
    declarations: [components],
    imports: [IonicModule],
    exports: [components]
})
export class ComponentsModule {}
