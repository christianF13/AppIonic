import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard} from "./guards/auth.guard";
import { NoLoginGuard} from './guards/no-login.guard'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',canActivate : [NoLoginGuard]}, //controles para accesos
  { path: 'home',loadChildren: './home/home.module#HomePageModule',canActivate : [AuthGuard]},
  { path: 'registro',loadChildren: './registro/registro.module#RegistroPageModule', canActivate : [NoLoginGuard] },
  { path: 'test',loadChildren: './test/test.module#TestPageModule',canActivate : [AuthGuard]},
  {path: 'resultado',loadChildren: './resultado/resultado.module#ResultadoPageModule'},





  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
