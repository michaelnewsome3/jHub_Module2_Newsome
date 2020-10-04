import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverActiveMenuPageRoutingModule } from './popover-active-menu-routing.module';

import { PopoverActiveMenuPage } from './popover-active-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverActiveMenuPageRoutingModule
  ],
  declarations: [PopoverActiveMenuPage]
})
export class PopoverActiveMenuPageModule {}
