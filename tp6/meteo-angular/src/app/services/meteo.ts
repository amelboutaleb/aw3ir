import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  constructor() {}

  getMeteo(name: string): Promise<any> {
    console.log("from service", name);

    return fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        name +
        "&units=metric&lang=fr&appid=6ade4a1dae4be2a0e3217132a1030ebd"
    )
    .then(response => response.json())
    .then(json => {
      if (json.cod == 200) {
        return Promise.resolve(json);
      } else {
        console.error(
          "Météo introuvable pour " + name + " (" + json.message + ")"
        );
        return Promise.reject(
          "Météo introuvable pour " + name + " (" + json.message + ")"
        );
      }
    });
  }
}
