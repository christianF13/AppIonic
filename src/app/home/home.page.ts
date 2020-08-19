import { Component, OnInit, NgModule } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { CommonModule } from '@angular/common';



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

export class HomePage implements OnInit {

  public isAdmin= false;

  constructor( public authservice : AuthService,public actionSheetController: ActionSheetController, public alerta:AlertController) { }

  ngOnInit() {
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
          .then(usersSnapshot => {
            this.isAdmin = usersSnapshot.data().isAdmin;
          });
      }
    });
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
