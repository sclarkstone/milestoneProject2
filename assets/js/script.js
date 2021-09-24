    var locations = [
      {
         name: 'York',
         type: 'rural',
         coords: {
          lat: 53.9600,
        lng: -1.0873
        }
      },
      {
         name: 'Birmingham',
         type: 'urban',
         coords: {
          lat: 52.4862,
          lng: -1.8904
        }
      },
      {
         name: 'Worcester',
         type: 'rural',
         coords: {
          lat: 52.192,
          lng: -2.22
        }
      },
      {
         name: 'Nottingham',
         type: 'urban',
         coords: {
          lat: 52.95,
          lng: -1.15
        }
      },
      {
         name: 'Newcastle',
         type: 'urban',
         coords: {
          lat: 54.96667,
        lng: -1.6
        }
      },
      {
         name: 'Leicester',
         type: 'urban',
         coords: {
          lat: 52.63333,
          lng: -1.13333
        }
      },
      {
         name: 'Lancaster',
         type: 'urban',
         coords: {
          lat: 54.047,
          lng: -2.801
        }
      },
      {
         name: 'Exeter',
         type: 'urban',
         coords: {
          lat: 50.71667,
          lng: -3.53333
        }
      },
      {
         name: 'Coventry',
         type: 'rural',
         coords: {
          lat: 52.40805,
        lng: -1.51056
        }
      },
      {
         name: 'Canterbury',
         type: 'rural',
         coords: {
          lat: 51.28,
        lng: 1.08
        }
      },
      {
         name: 'Cambridge',
         type: 'urban',
         coords: {
          lat: 52.20528,
        lng: 0.119167
        }
      },
      {
         name: 'Bath',
         type: 'urban',
         coords: {
          lat: 51.38,
        lng: -2.36
        }
      },
      {
         name: 'Oxford',
         type: 'urban',
         coords: {
          lat: 51.75202,
          lng: -1.25768
        }
      },
      {
         name: 'London',
         type: 'urban',
         coords: {
          lat: 51.50987,
        lng: -0.11809
        }
      },
      {
         name: 'Northampton',
         type: 'urban',
         coords: {
          lat: 52.24048,
        lng: -0.90266
        }
      },
      {
         name: 'Manchester',
         type: 'urban',
         coords: {
          lat: 53.48396,
        lng: -2.24464
        }
      },
      {
         name: 'Bristol',
         type: 'urban',
         coords: {
          lat: 51.45451,
          lng: -2.58791
        }
      },
      {
         name: 'Bedford',
         type: 'rural',
         coords: {
          lat: 52.13644,
          lng: -0.46074
        }
      },
      {
         name: 'Southampton',
         type: 'coastal',
         coords: {
          lat: 50.9097,
          lng: -1.40435
        }
      },
      {
         name: 'Leeds',
         type: 'coastal',
         coords: {
          lat: 53.80128,
          lng: -1.54857
        }
      },
      {
         name: 'Plymouth',
         type: 'coastal',
         coords: {
          lat: 50.37629,
        lng: -4.14384
        }
      },
   
   ];
   
   const OPENWEATHER_API_KEY = 'd92ede264e126d1fde57b9996e67937f';
   const OPENWEATHERMAP_API_URL = `https://api.openweathermap.org/data/2.5/weather`;
   
   
   function mapLocationToCityName(locationList) {
      return locationList.map(location => location['name']);
   }
   
   function filterLocationsByType(locationList, locationType) {
      return locationList.filter(location => (location.type === locationType));
   }
   
   let cityNames = mapLocationToCityName(locations);
   
   
   function showCityProps(city) {
     console.log(city);
      // Show city name
      document.getElementById("city-name").innerHTML = `<h3>${city}</h3`;
      //produce custom city link to visitEngland - events
      document.getElementById("events").innerHTML =
         `<i class="far fa-calendar-alt"></i> Activities, up-coming events and best restaurants in the area visit: <a href="https://www.visitengland.com/things-to-do/${city}" target="_blank">VisitEngland</a>`;
      //produce custom city link to airb and b - hotels
      document.getElementById("hotel").innerHTML =
         `<i class="fas fa-hotel"></i> Holiday rentals, cabins, beach houses and unique homes in the area visit: <a href="https://www.airbnb.co.uk/${city}-united-kingdom/stays" target="_blank">Airbnb</a>`;
      //add travel link - travel
      document.getElementById("travel").innerHTML =
         '<i class="fas fa-bus"></i> To plan your journey visit: <a href="https://www.nationalrail.co.uk/" target="_blank">National Rail</a>';
   
   }
   
   document.getElementById("randomBtn").addEventListener("click", function () {
      //check to see if any user filters were applied
      let locationType = '';
      if (document.getElementById('cityCriteria1').checked) {
         //filter city array to type is coastal
         locationType = 'coastal';
   
      } else if (document.getElementById('cityCriteria2').checked) {
         //filter city array to type is urban
         locationType = 'urban';
   
      } else if (document.getElementById('cityCriteria3').checked) {
         //filter city array to type is rural
         locationType = 'rural';
      }
   
      if (locationType) {
         const filteredArray = filterLocationsByType(locations, 'coastal');
         cityNames = mapLocationToCityName(filteredArray);
      }
   
      // randomly pick a city and display
      let randomCity = cityNames[Math.floor(Math.random() * cityNames.length)];
   
      // Show city props on HTML
      showCityProps(randomCity);
   
      fetchWeatherInfoForCityAndShow(randomCity);
   });
   
   
   function fetchWeatherInfoForCityAndShow(cityName) {
      fetch(`${OPENWEATHERMAP_API_URL}?q=${cityName},GB&appid=${OPENWEATHER_API_KEY}`)
      .then(function (resp) {
         return resp.json();
      }) // Convert data to json
      .then(function (data) {
   
         drawWeather(data); // Call drawWeather
   
      })
      .catch(function () {
         // catch any errors
         document.getElementById('error').innerHTML =
         'Sorry, there was an error with your request. There is a limit on the API requests. Please wait and try again later.';
   
      });
   }
   
   function drawWeather(d) {
      //convert Kelvins temp to celcius
      var tempInCelsius = Math.round(parseFloat(d.main.temp) - 273.15);
      document.getElementById('temp').innerHTML = `<i class="fas fa-temperature-low"></i>${tempInCelsius}&deg; with ${d.weather[0].description}`;
   }