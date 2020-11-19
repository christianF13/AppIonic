import { Component, OnInit } from '@angular/core';
import { SerPreguntasService, pregun } from '../services/ser-preguntas.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { stringify } from 'querystring';




@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage implements OnInit {

  public myColor =['danger','dark'];
  public colors = ['dark','falta'];
  public cont= 0;
 
  public myColorC =['danger','dark'];
  public colorsC = ['dark','falta'];
  public contC= 0;

  public myColorCr =['danger','dark'];
  public colorsCr = ['dark','falta'];
  public contCr= 0;

  public myColorS =['danger','dark'];
  public colorsS = ['dark','falta'];
  public contS= 0;

  public myColorR =['danger','dark'];
  public colorsR = ['dark','falta'];
  public contR= 0;

  public myColorA =['danger','dark'];
  public colorsA = ['dark','falta'];
  public contA= 0;
  
  isDisabled  = false;
  isDisabled2 = true;
  isDisabled3 = true;
  isDisabled4 = true;
  isDisabled5 = true;
  isDisabled6 = true;
  
  
 

  constructor(private SerPregun: SerPreguntasService, private router: Router,
    public actionSheetController: ActionSheetController, public authservice: AuthService,
    public alerta: AlertController) { }

  //metodo de csmbio de color de botones y desactivar boton al momento de dar click
 

  bAlfabetizacion(index:number){
    this.cont++;
    this.cont=(this.cont%this.colors.length);
    this.myColor[index] = this.colors[this.cont]
    this.isDisabled = true
    this.isDisabled2 = false
  }

  bComunicacion(index:number){
    this.contC++;
    this.contC=(this.contC%this.colorsC.length);
    this.myColorC[index] = this.colorsC[this.contC]
    this.isDisabled2 = true; 
    this.isDisabled3 = false ;
  }

  bCreacion(index:number){
    this.contCr++;
    this.contCr=(this.contCr%this.colorsCr.length);
    this.myColorCr[index] = this.colorsCr[this.contCr]
    this.isDisabled3 = true;  
    this.isDisabled4 = false;
  }

  bSeguridad(index:number){
    this.contS++;
    this.contS=(this.contS%this.colorsS.length);
    this.myColorS[index] = this.colorsS[this.contS]
    this.isDisabled4 = true; 
    this.isDisabled5 = false
  }

  bResolver(index:number){
    this.contR++;
    this.contR=(this.contR%this.colorsR.length);
    this.myColorR[index] = this.colorsR[this.contR]
    this.isDisabled5 = true; 
    this.isDisabled6 = false;
  }


  bR(index:number){
    this.contA++;
    this.contA=(this.contA%this.colorsA.length);
    this.myColorA[index] = this.colorsA[this.contA]
    this.isDisabled6 = true; 
  }


  ngOnInit() {
   this.Alerta();
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
      header: ' !! AVISO IMPORTANTE !!',  
      cssClass: 'foo' ,
      message: 'A continuación encontraras distintas areas a evaluar, de las cuales solo una de ellas esta activa !! DESBLOQUEALAS !! desarrollando el test que se muestra en pantalla y obten el estado actual de tus competencias ',    
      buttons: ['Entendido'],
      
    } 
    );
    
    await alert.present();
  }


  Onlogout() {
    this.authservice.logout();
  }


}
