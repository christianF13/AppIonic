import { Component, OnInit } from '@angular/core';
import { SerPreguntasService, pregun } from "../services/ser-preguntas.service";
import { Router } from "@angular/router";
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-talfabetizacion',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})

export class TestPage implements OnInit {

  public respuestas: number[] = [];
  public MuyAlto: string ="Muy Alto";
  public Alto: string = "Alto"; 
  public Medio: string = "Medio";
  public Bajo: string ="Bajo";
  public MuyBajo: string="Muy Bajo";
  public AreaAl: string="Alfabetización e Informacion";


  constructor(public SerPreg: SerPreguntasService, public authservice: AuthService, public router: Router, public actionSheetController: ActionSheetController, public alerta: AlertController ) { 
    
  }

  ngOnInit() {
    this.SerPreg.seconds = 0;
    this.SerPreg.qnProgress = 0;
    this.SerPreg.getPreguntas().subscribe(preguntas => {
    this.SerPreg.qns = preguntas
    })  
   
  }

  //funcion para conteo de tiempo 
  startTimer() {
    this.SerPreg.timer = setInterval(() => {
      this.SerPreg.seconds++;
    }, 1000);

  }

  //obtener arreglo de las opciones seleccionadas por el usuario
  Answer(id, opciones) {
    this.SerPreg.qns[this.SerPreg.qnProgress].answer = opciones;
    this.SerPreg.qnProgress++;
    this.respuestas.push(opciones);
    if (this.SerPreg.qnProgress == 10) {
      clearInterval(this.SerPreg.timer); 
      this.getResult(this.respuestas);  
      this.router.navigate(['/resultado']); 
     
    }  
   
  }

  //metodo de comparar accion con respuesta 
  getResult(opciones:number[]){
    var result:number;
    console.log(opciones);
    this.SerPreg.getPreguntas().subscribe(
     async  (data: any) => {
        this.SerPreg.correctAnswerCount = 0;
        this.SerPreg.qns.forEach((e,i) => {   
          if(e.respuesta ==opciones[i]){
            this.SerPreg.correctAnswerCount++;
          }      
        })
    
      console.log(this.SerPreg.correctAnswerCount);   
      
      
      this.nivel().then(()=> {
        console.log('MAYBE??');
       });
      }
    );
  };


 //establecer nivel de commpetencias 
 async nivel(){
  
    this.SerPreg.area = this.AreaAl;
    if((this.SerPreg.correctAnswerCount >=9) && (this.SerPreg.correctAnswerCount <=10)){
      console.log(this.MuyAlto);
      this.SerPreg.nivele = this.MuyAlto;
    }
    else if((this.SerPreg.correctAnswerCount >=7) && (this.SerPreg.correctAnswerCount <9)){
      console.log(this.Alto);
      this.SerPreg.nivele = this.Alto;
    }
   else if((this.SerPreg.correctAnswerCount >=5) && (this.SerPreg.correctAnswerCount <7)){
      console.log(this.Medio);
      this.SerPreg.nivele = this.Medio;
    }
    else if((this.SerPreg.correctAnswerCount >=3) && (this.SerPreg.correctAnswerCount <5)){
      console.log(this.Bajo);
      this.SerPreg.nivele = this.Bajo;
    }
    else if(this.SerPreg.correctAnswerCount < 3){
      console.log(this.MuyBajo);
      this.SerPreg.nivele = this.MuyBajo;
    }
     
   const res =  await this.authservice.uploadResult(this.SerPreg.correctAnswerCount,this.SerPreg.nivele, this.SerPreg.area );
    console.log(res);
    
}

  //metodo boton de desconectarse
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
  //boton de alerta informativa
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









