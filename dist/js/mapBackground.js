function showGoogleMaps() {
  var oldOfficeCoords = [60.154374, 24.886746];
  var newOfficeCoords = [60.1687025, 24.9341899];

  var middleCoords = [
    (oldOfficeCoords[0] + newOfficeCoords[0]) * 0.5,
    (oldOfficeCoords[1] + newOfficeCoords[1]) * 0.5
  ];
  var oldOfficePosition = new google.maps.LatLng(oldOfficeCoords[0], oldOfficeCoords[1]);
  var newOfficePosition = new google.maps.LatLng(newOfficeCoords[0], newOfficeCoords[1]);
  var mapCenterPointPosition = new google.maps.LatLng(
    middleCoords[0] + 0.006, 
    middleCoords[1]
  );

  var mapOptions = {
      zoom: 14,
      streetViewControl: false,
      scaleControl: false,
      panControl: false,
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      mapTypeControl: false,
      center: mapCenterPointPosition,
      draggable: false
  };

  map = new google.maps.Map(document.getElementById('googlemaps'), mapOptions);

  var marker1 = new google.maps.Marker({
      position: oldOfficePosition,
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      title: 'The Old Futurice Office'
  });
  var marker2 = new google.maps.Marker({
      position: newOfficePosition,
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      title: 'The New Futurice Office'
  });
}
 
google.maps.event.addDomListener(window, 'load', showGoogleMaps);
