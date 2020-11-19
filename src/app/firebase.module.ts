import { NgModule } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database"; 
import { AngularFireStorageModule } from "@angular/fire/storage"; 
import { AngularFireUploadTask} from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/firebase-config';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthService } from './services/auth.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';



@NgModule({
 
  imports: [ 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,AngularFireStorageModule,
    
  ],
  exports: [ 
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,AngularFireStorageModule,
    
  ],

  
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide:FirestoreSettingsToken, useValue:{}}

     
  ],
  
})
export class FirebaseModule {}
