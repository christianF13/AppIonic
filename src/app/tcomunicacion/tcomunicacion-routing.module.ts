import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TcomunicacionPage } from './tcomunicacion.page';

const routes: Routes = [
  {
    path: '',
    component: TcomunicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TcomunicacionPageRoutingModule {}
