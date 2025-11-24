import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Meteo } from './meteo/meteo';
import { FormsModule } from '@angular/forms';
import { MeteoDetail } from './meteo-detail/meteo-detail';

@NgModule({
  declarations: [
    App,
    Meteo,
    MeteoDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
