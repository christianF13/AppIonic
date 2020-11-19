import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  slides = [
    {
    img: 'assets/img/recurso.svg',
    titulo: 'Son el conjunto de conocimientos y habilidades​ que permiten un uso seguro​ y eficiente de las tecnologías de la información y las comunicaciones.' 
     },
    {
    img: 'assets/img/recurso2.svg',
    titulo: 'La asignación de tu nivel de competencias se determina de acuerdo a los resultados obtenidas al evaluarte'
    },
    {
      img: 'assets/img/recurso3.svg',
      titulo: 'La aplicación evalua 5 areas especificas que ayudan a determinar tu estado actual de competencias, utilizando el marco de referencia DigComp 2.1'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
