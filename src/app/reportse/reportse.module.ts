import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsePageRoutingModule } from './reportse-routing.module';

import { ReportsePage } from './reportse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsePageRoutingModule
  ],
  declarations: [ReportsePage]
})
export class ReportsePageModule {}
