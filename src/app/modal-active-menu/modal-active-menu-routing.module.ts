import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalActiveMenuPage } from './modal-active-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ModalActiveMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalActiveMenuPageRoutingModule {}
