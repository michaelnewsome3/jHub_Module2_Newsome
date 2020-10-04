import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverActiveMenuPage } from './popover-active-menu.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverActiveMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverActiveMenuPageRoutingModule {}
