import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportcrePageRoutingModule } from './reportcre-routing.module';

import { ReportcrePage } from './reportcre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportcrePageRoutingModule
  ],
  declarations: [ReportcrePage]
})
export class ReportcrePageModule {}
