import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, shareReplay, tap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


export interface User {
  nivelAl: User;
  nivelCo: any;
  isAdmin:boolean
}

@NgModule({
  imports: [
    CommonModule,  
  ],
  declarations: [HomePage]
})

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit , OnDestroy{

  public prome: any;

  public isAdmin= false;
  public myColor =['danger','dark'];
  public colors = ['dark','falta'];
  public cont= 0;

  isDisabled  = false;
  isDisabled1  = true;

private sub: Subscription;
 
  constructor( 
    public authservice : AuthService,
    private readonly AFauth: AngularFireAuth,
    private readonly db: AngularFirestore,
    public actionSheetController: ActionSheetController, public alerta:AlertController) { }


  public user$: Observable<User | null> = this.AFauth.user.pipe(
    switchMap(currentUser => of(currentUser).pipe(
      map(user => user.uid),
      map(uid => this.db.collection('users').doc<User>(uid)),
      switchMap(userDoc => userDoc.get()),
      map(doc => doc.data() as User),
      catchError(err=> of(null)),
    )),
    shareReplay(1),
    );

    public hasCompletedEval$ = this.user$. pipe(
      map(user => !!(user && user.nivelAl && user.nivelCo)),
      shareReplay(1)
    );
    
    public isAdmin$:Observable<boolean> = this.user$.pipe(
      map(user => user && user.isAdmin),
      tap(user => console.log(user)),
  );

   ngOnInit() {
   this.sub= this.hasCompletedEval$.subscribe(completed => {
     console.log('==================================')
     this.isDisabled =completed;
     console.log('==================================')
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }



  btn(index:number){
    this.cont++;
    this.cont=(this.cont%this.colors.length);
    this.myColor[index] = this.colors[this.cont]
    this.isDisabled = true
   
    
  }

  Onlogout(){
    this.authservice.logout();
  }

  

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'logout',
        handler: () => {
          this.Onlogout()
        },
      }] 
    });
    await actionSheet.present();
  }

  async Alerta() {
    const alert = await this.alerta.create({
      header: '¿Que son las competencias digitales?',     
      message: 'La competencia digital se define como el uso crítico y seguro de las Tecnologías de la Sociedad de la Información para el trabajo,el ocio y la comunicación. Supone un conjunto de conocimientos, habilidades, actitudes y estrategias que se requieren para el uso de los medios digitales y de las tecnologías de información y comunicación.',
      buttons: ['Entendido']
    });

    await alert.present(); 
  }


  
}
