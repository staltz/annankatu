var officeCoords = [60.1687025, 24.9341899];
     
function showGoogleMaps() {
 
  var newOfficePosition = new google.maps.LatLng(officeCoords[0], officeCoords[1]);
  var mapCenterPointPosition = new google.maps.LatLng(
    officeCoords[0] + 0.002, 
    officeCoords[1]
  );

  var mapOptions = {
      zoom: 16, // initialize zoom level - the max value is 21
      streetViewControl: false, // hide the yellow Street View pegman
      scaleControl: false, // disable users from zooming the Google Map
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: mapCenterPointPosition
  };

  map = new google.maps.Map(document.getElementById('googlemaps'), mapOptions);

  // Show the default red marker at the location
  marker = new google.maps.Marker({
      position: newOfficePosition,
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      title: 'The NEW Futurice Office'
  });
}
 
google.maps.event.addDomListener(window, 'load', showGoogleMaps);
