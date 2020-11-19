import { Component, ViewChild } from '@angular/core';

import { Platform, IonApp } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import {timer}  from 'rxjs/observable/timer';
import { app } from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
    showSplash = true;
  subscription: any;
   
   

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
   
  ) {
    this.initializeApp(); 
   
    
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault(); 
      this.splashScreen.hide();
 
      timer(7000).subscribe(()=> this.showSplash=false)
      
     
    
    });
  }

  
 


}
