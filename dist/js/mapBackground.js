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

  // TODO: Get this from the app.
  var percentage = 0.22;

  var pathCoordinates = [
    new google.maps.LatLng(oldOfficeCoords[0], oldOfficeCoords[1]),
    new google.maps.LatLng(60.154580, 24.886695),
    new google.maps.LatLng(60.155328, 24.885128),
    new google.maps.LatLng(60.157132, 24.885708),
    new google.maps.LatLng(60.159247, 24.887253),
    new google.maps.LatLng(60.161104, 24.889463),
    new google.maps.LatLng(60.161670, 24.893862),
    new google.maps.LatLng(60.162535, 24.900685),
    new google.maps.LatLng(60.162994, 24.903732),
    new google.maps.LatLng(60.164147, 24.907165),
    new google.maps.LatLng(60.164382, 24.913195),
    new google.maps.LatLng(60.164563, 24.917572),
    new google.maps.LatLng(60.164649, 24.921649),
    new google.maps.LatLng(60.164958, 24.925447),
    new google.maps.LatLng(60.165972, 24.928366),
    new google.maps.LatLng(60.166538, 24.930447),
    new google.maps.LatLng(60.167483, 24.931080),
    new google.maps.LatLng(60.167499, 24.932550),
    new google.maps.LatLng(60.168283, 24.934846),
    new google.maps.LatLng(newOfficeCoords[0], newOfficeCoords[1])
  ];

  // Let's be optimistic: ceil()
  var idx = Math.min(
      Math.ceil(percentage * pathCoordinates.length),
      pathCoordinates.length
    );

  // How much we have traveled already
  var traveledPath = pathCoordinates.slice(0, idx);

  var traveledPoly = new google.maps.Polyline({
    path: traveledPath,
    geodesic: true,
    strokeColor: 'rgb(255,82,64)',
    strokeOpacity: 1,
    strokeWeight: 4
  });

  // The rest of the way to the new office
  // -1 for the first bit (line needs two ends)
  var futurePath = pathCoordinates.slice(idx-1);

  var futurePoly = new google.maps.Polyline({
    path: futurePath,
    geodesic: true,
    strokeColor: 'rgb(255,82,64)',
    strokeOpacity: 0.4,
    strokeWeight: 2
  });

  traveledPoly.setMap(map);
  futurePoly.setMap(map);
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps);
