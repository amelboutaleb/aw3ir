import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // nécessaire pour [(ngModel)]

@Component({
  selector: 'app-meteo',
  standalone: false,
  templateUrl: './meteo.html',
  styleUrl: './meteo.css',
})
export class Meteo implements OnInit {
  // objet pour le formulaire
  city: any = {
    name: '',
    id: 0,
    weather: null
  };

  // liste des villes
  cityList: any[] = [];

  constructor() {}

  ngOnInit() {
    // récupérer la liste depuis localStorage si elle existe
    const storedList = localStorage.getItem('cityList');
    if (storedList !== null) {
      this.cityList = JSON.parse(storedList);
    }
  }

  onSubmit() {
    if (this.city.name && !this.isCityExist(this.city.name)) {
      let currentCity = { name: this.city.name, id: Date.now(), weather: null };
      this.cityList.push(currentCity);
      this.saveCityList();
      console.log(this.city.name, 'ajouté à la liste');
      this.city.name = ''; // vider le champ après ajout
    } else {
      console.log(this.city.name, 'existe déjà dans la liste');
    }
  }

  remove(_city: any) {
    this.cityList = this.cityList.filter(item => item.name !== _city.name);
    this.saveCityList();
  }

  isCityExist(_cityName: string) {
    return this.cityList.some(item => item.name?.toUpperCase() === _cityName.toUpperCase());
  }

  saveCityList() {
    localStorage.setItem('cityList', JSON.stringify(this.cityList));
  }
}

