import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalArchiveMenuPageRoutingModule } from './modal-archive-menu-routing.module';

import { ModalArchiveMenuPage } from './modal-archive-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalArchiveMenuPageRoutingModule
  ],
  declarations: [ModalArchiveMenuPage]
})
export class ModalArchiveMenuPageModule {}
