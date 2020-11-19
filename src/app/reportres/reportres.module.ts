import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportresPageRoutingModule } from './reportres-routing.module';

import { ReportresPage } from './reportres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportresPageRoutingModule
  ],
  declarations: [ReportresPage]
})
export class ReportresPageModule {}
