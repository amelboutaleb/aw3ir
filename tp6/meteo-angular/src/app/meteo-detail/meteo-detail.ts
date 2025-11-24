import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meteo-detail',
  standalone: false,
  templateUrl: './meteo-detail.html',
  styleUrl: './meteo-detail.css',
})
export class MeteoDetail implements OnInit {
  cityName: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupère le paramètre "name" depuis l'URL
    this.cityName = this.route.snapshot.paramMap.get('name');
  }
}




