import { Component, OnInit, OnDestroy } from '@angular/core';
import { SerPreguntasService, pregun } from "../services/ser-preguntas.service";
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { Chart } from 'chart.js';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit , OnDestroy{

  public visualizar: any[];
  public user: any;
  public MuyAlto: string = "Muy Alto";
  public Alto: string = "Alto";
  public Medio: string = "Medio";
  public Bajo: string = "Bajo";
  public MuyBajo: string = "Muy Bajo";

  public promedio: number;




  constructor(public authservice: AuthService, public SerPreg: SerPreguntasService, public actionSheetController: ActionSheetController,public alerta:AlertController) {
    this.user = JSON.parse(localStorage.getItem('user'));
    
  }

sub: Subscription

  ngOnInit() {
    this.sub = this.SerPreg.getVisualizar().subscribe(async chats => {
      this.visualizar = chats;
      await this.promedioG();
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
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


  Onlogout() {
    this.authservice.logout();

  }

  async Alerta() {
    const alert = await this.alerta.create({
      header: '¿Que son las competencias digitales?',     
      message: 'La competencia digital se define como el uso crítico y seguro de las Tecnologías de la Sociedad de la Información para el trabajo,el ocio y la comunicación. Supone un conjunto de conocimientos, habilidades, actitudes y estrategias que se requieren para el uso de los medios digitales y de las tecnologías de información y comunicación.',
      buttons: ['Entendido']
    });

    await alert.present(); 
  }



 async promedioG() {

    this.promedio = (+this.user.resultAl + +this.user.resultCo + +this.user.resultCre + +this.user.resultSegu + +this.user.resultResol) / 5;
    if ((this.promedio >= 9) && (this.promedio <= 10)) {

      this.SerPreg.nivele = this.MuyAlto;
    }
    else if ((this.promedio >= 7) && (this.promedio < 9)) {

      this.SerPreg.nivele = this.Alto;
    }
    else if ((this.promedio >= 5) && (this.promedio < 7)) {

      this.SerPreg.nivele = this.Medio;
    }
    else if ((this.promedio >= 3) && (this.promedio < 5)) {

      this.SerPreg.nivele = this.Bajo;
    }
   else if (this.promedio < 3) {

      this.SerPreg.nivele = this.MuyBajo;
    }

    await this.authservice.uploadPromedio(this.promedio, this.SerPreg.nivele);

  }


}
