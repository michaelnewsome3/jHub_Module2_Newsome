import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalArchiveMenuPage } from './modal-archive-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ModalArchiveMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalArchiveMenuPageRoutingModule {}
