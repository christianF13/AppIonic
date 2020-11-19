import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportalfPageRoutingModule } from './reportalf-routing.module';

import { ReportalfPage } from './reportalf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportalfPageRoutingModule
  ],
  declarations: [ReportalfPage]
})
export class ReportalfPageModule {}
