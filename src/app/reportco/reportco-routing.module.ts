import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportcoPage } from './reportco.page';

const routes: Routes = [
  {
    path: '',
    component: ReportcoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportcoPageRoutingModule {}
