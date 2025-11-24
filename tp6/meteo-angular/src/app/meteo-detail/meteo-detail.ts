import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeteoService } from '../services/meteo';

@Component({
  selector: 'app-meteo-detail',
  standalone: false,
  templateUrl: './meteo-detail.html',
  styleUrls: ['./meteo-detail.css'],
})
export class MeteoDetail implements OnInit {
  cityName: string | null = '';
  meteo: any = null;
  latlon: string = '';
  error: any = null;
  loading: boolean = true; // ajout d'un flag "chargement"

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) {}

  ngOnInit(): void {
    this.cityName = this.route.snapshot.paramMap.get('name');
    if (this.cityName) {
      this.getMeteo(this.cityName);
    } else {
      this.loading = false;
    }
  }

  getMeteo(name: string): void {
    this.meteoService.getMeteo(name)
      .then(response => {
        this.meteo = response;
        if (this.meteo.coord) {
          this.latlon = `${this.meteo.coord.lat},${this.meteo.coord.lon}`;
        }
        this.loading = false;
      })
      .catch(err => {
        console.error('Erreur météo :', err);
        this.error = err;
        this.loading = false;
      });
  }
}