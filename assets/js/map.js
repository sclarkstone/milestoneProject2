 /* new map */
 function initMap() {
    var options = {
      zoom: 6,
      center: {
        lat: 52.95,
        lng: -1.15
      }
    };
    var map = new google.maps.Map(document.getElementById('map'), options);
    /* city markers */
    addMarker({
      coords: {
        lat: 53.9600,
        lng: -1.0873
      },
      city: 'York'
    });
    addMarker({
      coords: {
        lat: 52.4862,
        lng: -1.8904
      },
      city: 'Birmingham'
    });
    addMarker({
      coords: {
        lat: 52.192,
        lng: -2.22
      },
      city: 'Worcester'
    });
    addMarker({
      coords: {
        lat: 52.95,
        lng: -1.15
      },
      city: 'Nottingham'
    });
    addMarker({
      coords: {
        lat: 54.96667,
        lng: -1.6
      },
      city: 'Newcastle'
    });
    addMarker({
      coords: {
        lat: 52.63333,
        lng: -1.13333
      },
      city: 'Leicester'
    });
    addMarker({
      coords: {
        lat: 54.047,
        lng: -2.801
      },
      city: 'Lancaster'
    });
    addMarker({
      coords: {
        lat: 50.71667,
        lng: -3.53333
      },
      city: 'Exeter'
    });
    addMarker({
      coords: {
        lat: 52.40805,
        lng: -1.51056
      },
      city: 'Coventry'
    });
    addMarker({
      coords: {
        lat: 51.28,
        lng: 1.08
      },
      city: 'Canterbury'
    });
    addMarker({
      coords: {
        lat: 52.20528,
        lng: 0.119167
      },
      city: 'Cambridge'
    });
    addMarker({
      coords: {
        lat: 51.38,
        lng: -2.36
      },
      city: 'Bath'
    });
    addMarker({
      coords: {
        lat: 51.75202,
        lng: -1.25768
      },
      city: 'Oxford'
    });
    addMarker({
      coords: {
        lat: 51.50987,
        lng: -0.11809
      },
      city: 'London'
    });
    addMarker({
      coords: {
        lat: 52.24048,
        lng: -0.90266
      },
      city: 'Northampton'
    });
    addMarker({
      coords: {
        lat: 53.48396,
        lng: -2.24464
      },
      city: 'Manchester'
    });
    addMarker({
      coords: {
        lat: 51.45451,
        lng: -2.58791
      },
      city: 'Bristol'
    });
    addMarker({
      coords: {
        lat: 52.13644,
        lng: -0.46074
      },
      city: 'Bedford'
    });
    addMarker({
      coords: {
        lat: 50.9097,
        lng: -1.40435
      },
      city: 'Southampton'
    });
    addMarker({
      coords: {
        lat: 53.80128,
        lng: -1.54857
      },
      city: 'Leeds'
    });
    addMarker({
      coords: {
        lat: 50.37629,
        lng: -4.14384
      },
      city: 'Plymouth'
    });







    /* new marker */
    function addMarker(props) {
      var marker = new google.maps.Marker({
        position: props.coords,
        map: map
      });

      marker.addListener('click', function () {
        /* document.getElementById('city').innerHTML = props.city; */
        /* city details */

        var placesService = new google.maps.places.PlacesService(document.getElementById(
        'cityDetail')); // i.e. <div id="map"></div>

        var request = {
          query: props.city,
          fields: ['formatted_address', 'name'],
        };

        placesService.findPlaceFromQuery(request, callback);

        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              document.getElementById('cityName').innerHTML = results[i].formatted_address;
              //produce custom city link to visitEngland - events
              document.getElementById("events").innerHTML =
                '<i class="far fa-calendar-alt"></i> Activities, up-coming events and best restaurants in the area visit: <a href="https://www.visitengland.com/things-to-do/' +
                results[i].name + '" target="_blank">VisitEngland</a>';
              //produce custom city link to airb and b - hotels
              document.getElementById("hotel").innerHTML =
                '<i class="fas fa-hotel"></i> Holiday rentals, cabins, beach houses and unique homes in the area visit: <a href="https://www.airbnb.co.uk/' +
                results[i].name + '-united-kingdom/stays" target="_blank">Airbnb</a>';
              //add travel link - travel
              document.getElementById("travel").innerHTML =
                '<i class="fas fa-bus"></i> To plan your journey visit: <a href="https://www.nationalrail.co.uk/" target="_blank">National Rail</a>';
              //get weather details for city from OpenweatherAPI and display    
              var key = 'd92ede264e126d1fde57b9996e67937f';
              fetch('https://api.openweathermap.org/data/2.5/weather?q=' + results[i].name + ',GB&appid=' + key)
                .then(function (resp) {
                  return resp.json();
                }) // Convert data to json
                .then(function (data) {

                  drawWeather(data); // Call drawWeather

                })
                .catch(function () {
                  document.getElementById('error').innerHTML =
                    'Sorry, there was an error with your request. There is a limit on the API requests. Please wait and try again later.';
                });



            }
          } else {
            document.getElementById('error').innerHTML =
              'Sorry, there was an error with your request. There is a limit on the API requests. Please wait and try again later.';

          }
        }
      });
    }

  }

  function drawWeather(d) {
    //convert Kelvins temp to celcius
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);

    document.getElementById('temp').innerHTML = '<i class="fas fa-temperature-low"></i> ' + celcius + '&deg; with ' +
      d.weather[0].description;
  }