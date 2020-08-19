import { Component, OnInit } from '@angular/core';
import { SerPreguntasService, pregun } from "../services/ser-preguntas.service";
import { Router } from "@angular/router";
import { HomePage } from "../home/home.page";
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'



@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})


export class TestPage implements OnInit {



  constructor(public SerPreg: SerPreguntasService, public authservice: AuthService, public router: Router, public actionSheetController: ActionSheetController, public alerta: AlertController) { }




  ngOnInit() {
    this.SerPreg.seconds = 0;
    this.SerPreg.qnProgress = 0;

    // this.SerPreg.getPreguntas().subscribe( preguntas =>{
    //  this.preg = preguntas; 

    this.SerPreg.getPreguntas().subscribe(preguntas => {
      this.SerPreg.qns = preguntas;



      //this.startTimer();


    })
  }



  //funcion para conteo de tiempo 
  startTimer() {
    this.SerPreg.timer = setInterval(() => {
      this.SerPreg.seconds++;
    }, 1000);

  }

  Answer(id, opciones) {
    this.SerPreg.qns[this.SerPreg.qnProgress].answer = opciones;
    this.SerPreg.qnProgress++;
    console.log(opciones)
    if (this.SerPreg.qnProgress == 10) {
      clearInterval(this.SerPreg.timer);
      this.router.navigate(['/resultado']);

    }
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

  Onlogout() {
    this.authservice.logout();
  }



}









