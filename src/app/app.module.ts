import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestore } from "@angular/fire/firestore";


import { AngularFireDatabaseModule } from "@angular/fire/database"; 
import { AngularFireStorageModule } from "@angular/fire/storage"; 
import { AngularFireUploadTask} from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';


//firebase config
import { AngularFirestoreModule } from "@angular/fire/firestore"; //Modulo Firestore (BD)
import { AngularFireAuthModule } from "@angular/fire/auth";  //Modulo de authenticacion
import { AngularFireModule } from "@angular/fire";            //Modulo para inicializar y que todo funcione bien vergas
import { firebaseConfig} from "../environments/environment";     // aqui se encuentra una variable de configuracion para inicializar firebase
import { CommonModule } from '@angular/common';
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,AngularFireDatabaseModule,AngularFireStorageModule, HttpClientModule,

  ],
  providers: [
    StatusBar,
    SplashScreen, 
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
