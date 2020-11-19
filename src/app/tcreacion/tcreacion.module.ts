import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TcreacionPageRoutingModule } from './tcreacion-routing.module';

import { TcreacionPage } from './tcreacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TcreacionPageRoutingModule
  ],
  declarations: [TcreacionPage]
})
export class TcreacionPageModule {}
