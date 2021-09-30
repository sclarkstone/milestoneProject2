 // Credit to Google maps (https://developers.google.com/maps/documentation/javascript/overview) for the initMap function in its entirity. 
 function initMap() {
   var options = {
     zoom: 6,
     center: {
       lat: 52.95,
       lng: -1.15,
     },
   };

   // Credit to Google maps (https://developers.google.com/maps/documentation/javascript/overview) for the variable map in its entirity. 
   var map = new google.maps.Map(document.getElementById("map"), options);

   //inspration for the addMarkers function from Google maps (https://developers.google.com/maps/documentation/javascript/adding-a-google-map). Rather then reiterating through each marker i utilised my locations array and looped through to get each cities coords.
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

       /* city details */
       // Credit to Google maps (https://developers.google.com/maps/documentation/javascript/places) for the variable placesService in its entirity. 

       var placesService = new google.maps.places.PlacesService(
         document.getElementById("cityDetail")
       );
       // Credit to Google maps (https://developers.google.com/maps/documentation/javascript/place-data-fields) for the variable request in its entirity. 

       var request = {
         query: props.city,
         fields: ["formatted_address", "name"],
       };

       placesService.findPlaceFromQuery(request, callback);

       //inspration for the callback function from Google maps (https://developers.google.com/maps/documentation/javascript/place-data-fields). 
       function callback(results, status) {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
           //clear any error messages
           document.getElementById('error').innerHTML = '';
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