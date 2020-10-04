import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverArchiveMenuPage } from './popover-archive-menu.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverArchiveMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverArchiveMenuPageRoutingModule {}
