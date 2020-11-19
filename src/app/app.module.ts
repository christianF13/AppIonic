import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';





import { FileOpener } from '@ionic-native/file-opener/ngx';




//firebase config
   // aqui se encuentra una variable de configuracion para inicializar firebase
import { CommonModule } from '@angular/common';

import { File } from '@ionic-native/file/ngx';

import { HttpClientModule } from '@angular/common/http';


import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { FirebaseModule } from './firebase.module';








@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,FirebaseModule, IonicModule.forRoot({hardwareBackButton: false}), AppRoutingModule,
   
    CommonModule, HttpClientModule,  BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    })
    
  ],

  
  providers: [
    StatusBar,
    SplashScreen, 
    File,FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    

     
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
