import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeteoService } from '../services/meteo';

@Component({
  selector: 'app-meteo-detail',
  standalone: false, // Garde comme tu l’avais, ou mets à vrai selon ton architecture
  templateUrl: './meteo-detail.html',
  styleUrls: ['./meteo-detail.css'],
})
export class MeteoDetail implements OnInit {
  cityName: string | null = '';
  meteo: any = null;
  latlon: string = '';
  error: any = null;

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) {}

  ngOnInit(): void {
    this.cityName = this.route.snapshot.paramMap.get('name');
    if (this.cityName) {
      this.getMeteo(this.cityName);
    }
  }

  getMeteo(name: string): void {
    this.meteoService.getMeteo(name)
      .then(response => {
        this.meteo = response;
        if (this.meteo.coord) {
          this.latlon = `${this.meteo.coord.lat},${this.meteo.coord.lon}`;
        }
      })
      .catch(err => {
        console.error('Erreur météo :', err);
        this.error = err;
      });
  }
}





