import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TseguridadPageRoutingModule } from './tseguridad-routing.module';

import { TseguridadPage } from './tseguridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TseguridadPageRoutingModule
  ],
  declarations: [TseguridadPage]
})
export class TseguridadPageModule {}
