import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInputPage } from './modal-input.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInputPageRoutingModule {}
