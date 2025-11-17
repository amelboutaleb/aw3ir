new Vue({
    el: '#weatherApp',
    data: {
        apiKey: '6ade4a1dae4be2a0e3217132a1030ebd', // Remplace par ta clé OpenWeather
        formCityName: '',
        cityList: [],
        messageForm: '',
        selectedCityWeather: null,
        map: null,
        marker: null
    },
    created() {
        // Charger la liste des villes depuis le localStorage
        const savedCities = localStorage.getItem('cityList');
        if (savedCities) this.cityList = JSON.parse(savedCities);
    },
    methods: {
        addCity() {
            const name = this.formCityName.trim();
            if (!name) return;

            // Vérifie si la ville existe via l'API
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&lang=fr&appid=${this.apiKey}`)
                .then(res => res.json())
                .then(data => {
                    if (data.cod === 200) {
                        // Ajoute si pas déjà dans la liste
                        if (!this.cityList.find(c => c.name.toLowerCase() === data.name.toLowerCase())) {
                            this.cityList.push({ name: data.name });
                            localStorage.setItem('cityList', JSON.stringify(this.cityList));
                        }
                        this.formCityName = '';
                        this.messageForm = '';
                    } else {
                        this.messageForm = "Ville non trouvée !";
                    }
                })
                .catch(err => this.messageForm = "Erreur lors de la recherche !");
        },
        removeCity(index) {
            this.cityList.splice(index, 1);
            localStorage.setItem('cityList', JSON.stringify(this.cityList));
        },
        selectCity(city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&lang=fr&appid=${this.apiKey}`)
                .then(res => res.json())
                .then(data => {
                    if (data.cod === 200) {
                        this.selectedCityWeather = data;
                        this.$nextTick(() => this.initMap(data.coord.lat, data.coord.lon));
                    } else {
                        alert("Impossible de récupérer la météo pour cette ville !");
                    }
                });
        },
        getMyLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        const lat = pos.coords.latitude;
                        const lon = pos.coords.longitude;
                        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${this.apiKey}`)
                            .then(res => res.json())
                            .then(data => {
                                this.selectedCityWeather = data;
                                this.$nextTick(() => this.initMap(lat, lon));
                            });
                    },
                    err => alert("Impossible de récupérer votre position !")
                );
            } else {
                alert("Votre navigateur ne supporte pas la géolocalisation !");
            }
        },
        initMap(lat, lon) {
            if (!this.map) {
                this.map = L.map('map').setView([lat, lon], 10);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; OpenStreetMap'
                }).addTo(this.map);
                this.marker = L.marker([lat, lon]).addTo(this.map);
            } else {
                this.map.setView([lat, lon], 10);
                this.marker.setLatLng([lat, lon]);
            }
        },
        weatherIcon(weather) {
            const id = weather.weather[0].id;
            if (id >= 200 && id < 300) return 'wi wi-thunderstorm';
            if (id >= 300 && id < 500) return 'wi wi-sprinkle';
            if (id >= 500 && id < 600) return 'wi wi-rain';
            if (id >= 600 && id < 700) return 'wi wi-snow';
            if (id >= 700 && id < 800) return 'wi wi-fog';
            if (id === 800) return 'wi wi-day-sunny';
            if (id === 801) return 'wi wi-day-cloudy';
            if (id === 802) return 'wi wi-cloud';
            if (id === 803 || id === 804) return 'wi wi-cloudy';
            return 'wi wi-na';
        },
        sunriseTime(weather) {
            return new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
        },
        sunsetTime(weather) {
            return new Date(weather.sys.sunset * 1000).toLocaleTimeString();
        }
    }
});
