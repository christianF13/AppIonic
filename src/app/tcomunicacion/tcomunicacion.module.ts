import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TcomunicacionPageRoutingModule } from './tcomunicacion-routing.module';

import { TcomunicacionPage } from './tcomunicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TcomunicacionPageRoutingModule
  ],
  declarations: [TcomunicacionPage]
})
export class TcomunicacionPageModule {}
