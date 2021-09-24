 function initMap() {
   var options = {
     zoom: 6,
     center: {
       lat: 52.95,
       lng: -1.15,
     },
   };
    var map = new google.maps.Map(document.getElementById("map"), options);
 
    locations.forEach(location => {
       addMarker({
          coords: location.coords,
          city: location.name
       });
    });
 
 
   /* new marker */
   function addMarker(props) {
     var marker = new google.maps.Marker({
       position: props.coords,
       map: map,
     });
 
     marker.addListener("click", function () {
       /* document.getElementById('city').innerHTML = props.city; */
       /* city details */
 
       var placesService = new google.maps.places.PlacesService(
         document.getElementById("cityDetail")
       ); // i.e. <div id="map"></div>
 
       var request = {
         query: props.city,
         fields: ["formatted_address", "name"],
       };
 
       placesService.findPlaceFromQuery(request, callback);
 
       function callback(results, status) {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
           for (var i = 0; i < results.length; i++) {
              showCityProps(results[i].name);
              fetchWeatherInfoForCityAndShow(results[i].name);
           }
         } else {
           document.getElementById("error").innerHTML =
             "Sorry, there was an error with your request. There is a limit on the API requests. Please wait and try again later.";
         }
       }
     });
   }
 }