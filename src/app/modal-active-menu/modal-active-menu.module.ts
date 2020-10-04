import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalActiveMenuPageRoutingModule } from './modal-active-menu-routing.module';

import { ModalActiveMenuPage } from './modal-active-menu.page';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalActiveMenuPageRoutingModule
  ],
  declarations: [ModalActiveMenuPage, ModalInfoPage],
  entryComponents: [ModalInfoPage]
})
export class ModalActiveMenuPageModule {}
