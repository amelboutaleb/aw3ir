import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Meteo } from './meteo/meteo';
import { MeteoDetail } from './meteo-detail/meteo-detail';

const routes: Routes = [
  { path: '', component: Meteo },                // page d’accueil
  { path: 'meteo/:name', component: MeteoDetail }, // détail météo d’une ville
  { path: '**', redirectTo: '' }                  // redirection si route non reconnue
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
