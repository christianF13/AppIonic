import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TcreacionPage } from './tcreacion.page';

const routes: Routes = [
  {
    path: '',
    component: TcreacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TcreacionPageRoutingModule {}
