import { Component, OnInit } from '@angular/core';
import {AuthService } from "../services/auth.service";
import {Router} from "@angular/router"
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public name : string;
  public apellidos: string;
  public cedula: number;
  public email : string;
  public password : string;

 

  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmitRegister(){
    if(this.password.length<6){
      alert('la contraseña es muy corta');
      return;
    }
    if(!this.validar(this.cedula)){
      alert('la cedula es invalida');
      return;
    }
    this.auth.register(this.email,this.password,this.name,this.apellidos,this.cedula).then(auth => {
      this.router.navigate(['slide'])
      
    }).catch(err => console.log(err))
      
    
  }

  private validar(cedula: number) {
    let cad = cedula + '';
    let total = 0;
    let longitud = cad.length;
    let longcheck = longitud - 1;

    if (cad !== "" && longitud === 10){
      for(let i = 0; i < longcheck; i++){
        if (i%2 === 0) {
          let aux = parseInt(cad.charAt(i)) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
        }
      }

      total = total % 10 ? 10 - total % 10 : 0;

      return parseInt(cad.charAt(longitud-1)) == total;
    }

    return false
  }


}
