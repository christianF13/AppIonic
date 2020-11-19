import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportcrePage } from './reportcre.page';

const routes: Routes = [
  {
    path: '',
    component: ReportcrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportcrePageRoutingModule {}
