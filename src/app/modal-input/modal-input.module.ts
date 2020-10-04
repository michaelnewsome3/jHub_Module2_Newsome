import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInputPageRoutingModule } from './modal-input-routing.module';

import { ModalInputPage } from './modal-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInputPageRoutingModule
  ],
  declarations: [ModalInputPage]
})
export class ModalInputPageModule {}
