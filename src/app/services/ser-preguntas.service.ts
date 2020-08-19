import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import { map } from "rxjs/operators";
import { HttpClientModule } from '@angular/common/http';
import { snapshotChanges } from '@angular/fire/database';

export interface pregun{
  pregunta : string 
  opciones : string[]
  id : string
  respuesta : string
  point : string
}

@Injectable({
  providedIn: 'root'
})
export class SerPreguntasService {

  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount = 0;

  constructor( private db:AngularFirestore, private http: HttpClientModule) { }

  displayTimeElapsed(){
  return Math.floor(this.seconds / 36000) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60)
}

  getPreguntas(){
    return this.db.collection('questions').snapshotChanges().pipe(map(p =>{
      return p.map(a=>{
        const data = a.payload.doc.data() as pregun;
        data.id = a.payload.doc.id;          
        return data; 
      })
    }))
  }



  getRespuestas(){
    var body = this.qns.map( x => x.id);
    return this.db.collection('questions').snapshotChanges();
    
  }
    
  

   

    

  

 
}

