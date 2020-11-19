import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportresPage } from './reportres.page';

const routes: Routes = [
  {
    path: '',
    component: ReportresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportresPageRoutingModule {}
