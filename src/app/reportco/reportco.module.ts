import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportcoPageRoutingModule } from './reportco-routing.module';

import { ReportcoPage } from './reportco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportcoPageRoutingModule
  ],
  declarations: [ReportcoPage]
})
export class ReportcoPageModule {}
