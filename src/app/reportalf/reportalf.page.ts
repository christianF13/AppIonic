import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { first, buffer, tap, map, shareReplay } from "rxjs/operators";
import { SerPreguntasService } from "../services/ser-preguntas.service";
import { NavController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from 'html-to-pdfmake';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export interface UserRep {
  name: string;
  apellidos: String;
  cedula: string;
  nivelAl: string;
  areaAL: string;
  areaCom: string;
  areaCre: string;
  areaSe: string;
  areaResul: string;
  resultAl: string;

}

@Component({
  selector: 'app-reportalf',
  templateUrl: './reportalf.page.html',
  styleUrls: ['./reportalf.page.scss'],
})
export class ReportalfPage implements OnInit {

  constructor(private firestore: AngularFirestore, public SerPreg: SerPreguntasService,
    public file: File, public fileOpener: FileOpener, public platform: Platform) { }


  public FilterBy: any;
  public projects: Array<any>;
  public item: any;


  public foodList: UserRep[];
  //variable para generar pdf
  pdfObj: any;
  datos: any;



  async ngOnInit() {
    this.foodList = await this.foodSource$.toPromise();
  }

  public foodSource$ = this.firestore.collection<UserRep>('users').get().pipe(
    map(snaps => snaps.docs.map(d => d.data() as UserRep)),
    tap(data=>console.log('Fetch DB', data)),
    map(docs =>docs.map(old => {
      const newDoc = old;
      if(!newDoc.nivelAl) {
        newDoc.nivelAl = 'No definido'       
      }
      if(!newDoc.resultAl){
        newDoc.resultAl = 'No definido'
      }
      return newDoc;
      
    })),
    shareReplay(1),
    tap(data=>console.log('Share DB', data))

  );

  async filterList(evt) {
    this.foodList = await this.foodSource$.toPromise();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }
    let i = 0;
    this.foodList = this.foodList.filter(currentFood => {
      if (currentFood.nivelAl === undefined) {
        currentFood.nivelAl = 'No definido'
      }
      i++;
      if (currentFood.name && searchTerm) {
        return (currentFood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          currentFood.apellidos.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          currentFood.cedula.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          currentFood.nivelAl.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }


  generatePDF() {
    console.log(this.foodList);
    let html = '<table><tr><th>Nombre</th><th>Apellido</th><th>cedula</th><th>Nivel</th><th>Puntaje</th></tr>';
    this.foodList.forEach(e => {
      html += '<tr> <td>' + e.name + '</td><td>' + e.apellidos + '</td><td>' + e.cedula + '</td><td>' + e.nivelAl + '</td><td>' + e.resultAl + '</td></tr>'
    })
    html += '</table> <br/> ' + 'Fecha de reporte: ' + new Date().getDate() + '/' + new Date().getUTCMonth() + '/' + new Date().getFullYear();
    html += '<br/> ' + 'Hora de reporte: ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    html += '<br/> Total de registros: ' + (this.foodList.length)
    const dataHTMLtoPDF = htmlToPdfmake(html)

    let docDefinition = {
      content: [
        { text: 'Reporte de usuarios', style: 'header' },
        { text: ' ', style: '' },
        dataHTMLtoPDF
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 20,
          alignment: 'center',

        }
      }
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);

    alert('PDF Generado');

  }

  openPDF() {

    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'hello.pdf', blob, { replace: true }).then(fileEntry => {

          this.fileOpener.open(this.file.dataDirectory + 'hello.pdf', 'application/pdf');

        });

      });

      return true;
    }

    this.pdfObj.download();


  }


}
