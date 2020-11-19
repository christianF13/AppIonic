import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NoLoginGuard } from './guards/no-login.guard'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [NoLoginGuard] }, //controles para accesos
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule', canActivate: [NoLoginGuard] },
  { path: 'test', loadChildren: './test/test.module#TestPageModule', canActivate: [AuthGuard] },
  { path: 'resultado', loadChildren: './resultado/resultado.module#ResultadoPageModule' },
  { path: 'areas', loadChildren: './areas/areas.module#AreasPageModule' },
  { path: 'tcomunicacion', loadChildren: './tcomunicacion/tcomunicacion.module#TcomunicacionPageModule' },
  { path: 'tcreacion', loadChildren: './tcreacion/tcreacion.module#TcreacionPageModule' },
  { path: 'tseguridad', loadChildren: './tseguridad/tseguridad.module#TseguridadPageModule' },
  { path: 'tresolver', loadChildren: './tresolver/tresolver.module#TresolverPageModule' },
  { path: 'visualizar', loadChildren: './visualizar/visualizar.module#VisualizarPageModule' },
  { path: 'reportes', loadChildren: './reportes/reportes.module#ReportesPageModule' },
  { path: 'reportalf', loadChildren: './reportalf/reportalf.module#ReportalfPageModule' },
  { path: 'reportco', loadChildren: './reportco/reportco.module#ReportcoPageModule' },
  { path: 'reportcre', loadChildren: './reportcre/reportcre.module#ReportcrePageModule' },
  { path: 'reportse', loadChildren: './reportse/reportse.module#ReportsePageModule' },
  { path: 'reportres', loadChildren: './reportres/reportres.module#ReportresPageModule' },
  { path: 'slide',loadChildren: './slide/slide.module#SlidePageModule'},






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
