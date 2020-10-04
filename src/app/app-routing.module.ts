import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modal-input',
    loadChildren: () => import('./modal-input/modal-input.module').then( m => m.ModalInputPageModule)
  },
  {
    path: 'modal-active-menu',
    loadChildren: () => import('./modal-active-menu/modal-active-menu.module').then( m => m.ModalActiveMenuPageModule)
  },
  {
    path: 'modal-info',
    loadChildren: () => import('./modal-info/modal-info.module').then( m => m.ModalInfoPageModule)
  },
  {
    path: 'modal-archive-menu',
    loadChildren: () => import('./modal-archive-menu/modal-archive-menu.module').then( m => m.ModalArchiveMenuPageModule)
  },
  {
    path: 'popover-active-menu',
    loadChildren: () => import('./popover-active-menu/popover-active-menu.module').then( m => m.PopoverActiveMenuPageModule)
  },
  {
    path: 'popover-archive-menu',
    loadChildren: () => import('./popover-archive-menu/popover-archive-menu.module').then( m => m.PopoverArchiveMenuPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
