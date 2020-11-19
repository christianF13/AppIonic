import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsePage } from './reportse.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsePageRoutingModule {}
