import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportalfPage } from './reportalf.page';

const routes: Routes = [
  {
    path: '',
    component: ReportalfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportalfPageRoutingModule {}
