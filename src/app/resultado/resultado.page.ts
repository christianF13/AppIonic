import { Component, OnInit, Input } from '@angular/core';
import { SerPreguntasService, pregun } from '../services/ser-preguntas.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { stringify } from 'querystring';




@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})


export class ResultadoPage implements OnInit { 

  @Input() opciones:any;

  public MuyAlto: string ="Muy Alto";
  public Alto: string = "Alto";
  public Medio: string = "Medio";
  public Bajo: string ="Bajo";
  public MuyBajo: string="Muy Bajo";



  constructor(public SerPregun: SerPreguntasService, private router: Router,
     public actionSheetController: ActionSheetController, public authservice: AuthService,
     public alerta: AlertController) {
    
   }


  ngOnInit() {
    
    
  }



  restart() {
    localStorage.setItem('qnProgress',"0");
    localStorage.setItem('qns',"");
    this.router.navigate(['/test']);
    this.router.navigate(['/test']);
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
