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


  filtrado: any[];

  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount = 0;
  nivele: string;
  niveleG: string;
  area: string;
  promedio: number;
  
   //variables de visualizacion 
   nivelAl:string
   resultAl: number
   nivelCo:string
   resultCo: number
   nivelCre:string
   resultCre: number
   nivelResol:string
   resultResol: number
   nivelSegu:string
   resultSegu: number

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

  getPreguntasCom(){
    return this.db.collection('ComunicaciónYcolaboración').snapshotChanges().pipe(map(p =>{
      return p.map(a=>{
        const data = a.payload.doc.data() as pregun;
        data.id = a.payload.doc.id;          
        return data; 
      })
    }))
  }
 
  getPreguntasCre(){
    return this.db.collection("CreacióndeContenido").snapshotChanges().pipe(map(p =>{
      return p.map(a=>{
        const data = a.payload.doc.data() as pregun;
        data.id = a.payload.doc.id;          
        return data; 
      })
    }))
  }
    
   
  getPreguntasSegu(){
    return this.db.collection("Seguridad").snapshotChanges().pipe(map(p =>{
      return p.map(a=>{
        const data = a.payload.doc.data() as pregun;
        data.id = a.payload.doc.id;          
        return data; 
      })
    }))
  }

  getPreguntasResol(){
    return this.db.collection("ResolverProblemas").snapshotChanges().pipe(map(p =>{
      return p.map(a=>{
        const data = a.payload.doc.data() as pregun;
        data.id = a.payload.doc.id;          
        return data; 
      })
    }))
  }
  


  //revisar consulta recuperar usuarios
  getVisualizar(){
    return this.db.collection('users').snapshotChanges().pipe(map (rooms =>{
      return rooms.map(a=>{
        const data = a.payload.doc.data() as pregun;
        data.id = a.payload.doc.id;   
        
        return data
        
      })
    }))

  }


 


  
 

 



   

    

  

 
}

