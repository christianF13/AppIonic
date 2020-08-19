import { Component, OnInit } from '@angular/core';
import { SerPreguntasService, pregun } from '../services/ser-preguntas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {

public puntaje: number;


  constructor(private SerPregun: SerPreguntasService, private router: Router) { }


  ngOnInit() {
    this.SerPregun.getRespuestas().subscribe(
      (data: any) => {
        this.SerPregun.correctAnswerCount = 0;
        this.SerPregun.qns.forEach((e, i) => {
          if (e.respuesta == data[i])
            this.puntaje++
            this.SerPregun.correctAnswerCount++;
            this.puntaje = data[i]
          e.correct = data[i];
          console.log(e.respuesta)
          
        })
      }
    );

  }

  //  this.SerPregun.getChatRooms().subscribe( chats => {
  //   this.chatRooms = chats;








  restart() {
    this.router.navigate(['/test']);
  }




}
