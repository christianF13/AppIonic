import { Component, OnInit } from '@angular/core';
import {AuthService } from "../services/auth.service";
import {Router} from "@angular/router"

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public name : string;
  public apellidos: string;
  public cedula: Int16Array;
  public email : string;
  public password : string;

 

  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmitRegister(){
    this.auth.register(this.email,this.password,this.name,this.apellidos,this.cedula).then(auth => {
      this.router.navigate(['home'])
      console.log(auth)
    }).catch(err => console.log(err))
      
    
  }


}
