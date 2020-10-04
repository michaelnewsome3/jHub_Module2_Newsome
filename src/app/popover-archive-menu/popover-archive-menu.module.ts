import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverArchiveMenuPageRoutingModule } from './popover-archive-menu-routing.module';

import { PopoverArchiveMenuPage } from './popover-archive-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverArchiveMenuPageRoutingModule
  ],
  declarations: [PopoverArchiveMenuPage]
})
export class PopoverArchiveMenuPageModule {}
