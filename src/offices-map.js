class OfficesMap {
  constructor(percentage) {
    this.type = 'Widget';
    this.percentage = percentage;
  }

  init() {
    let oldOfficeCoords = [60.154374, 24.886746];
    let newOfficeCoords = [60.1687025, 24.9341899];
    let middleCoords = [
      (oldOfficeCoords[0] + newOfficeCoords[0]) * 0.5,
      (oldOfficeCoords[1] + newOfficeCoords[1]) * 0.5
    ];
    let oldOfficePosition = new google.maps.LatLng(oldOfficeCoords[0], oldOfficeCoords[1]);
    let newOfficePosition = new google.maps.LatLng(newOfficeCoords[0], newOfficeCoords[1]);
    let mapCenterPointPosition = new google.maps.LatLng(
      middleCoords[0] + 0.006,
      middleCoords[1]
    );
    let pathCoordinates = [
      [oldOfficeCoords[0], oldOfficeCoords[1]],
      [60.154580, 24.886695],
      [60.155328, 24.885128],
      [60.157132, 24.885708],
      [60.159247, 24.887253],
      [60.161104, 24.889463],
      [60.161670, 24.893862],
      [60.162535, 24.900685],
      [60.162994, 24.903732],
      [60.164147, 24.907165],
      [60.164382, 24.913195],
      [60.164563, 24.917572],
      [60.164649, 24.921649],
      [60.164958, 24.925447],
      [60.165972, 24.928366],
      [60.166538, 24.930447],
      [60.167483, 24.931080],
      [60.167499, 24.932550],
      [60.168283, 24.934846],
      [newOfficeCoords[0], newOfficeCoords[1]]
    ].map(([lat, lng]) => new google.maps.LatLng(lat, lng));

    let element = document.createElement('div');
    element.style.height = '100%';
    element.style.width = '100%';
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.zIndex = '0';

    let mapOptions = {
      zoom: 14,
      streetViewControl: false,
      scaleControl: false,
      panControl: false,
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      mapTypeControl: false,
      scrollwheel: false,
      center: mapCenterPointPosition,
      draggable: false
    };

    let map = new google.maps.Map(element, mapOptions);

    element.officesMap = {
      map,
      pathCoordinates
    };

    let marker1 = new google.maps.Marker({
      position: oldOfficePosition,
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      title: 'The Old Futurice Office'
    });
    let marker2 = new google.maps.Marker({
      position: newOfficePosition,
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      title: 'The New Futurice Office'
    });

    return element;
  }

  update(previous, domNode) {
    // Let's be optimistic: ceil()
    let idx = Math.min(
      Math.ceil(this.percentage * domNode.officesMap.pathCoordinates.length),
      domNode.officesMap.pathCoordinates.length
    );

    // How much we have traveled already
    let traveledPath = domNode.officesMap.pathCoordinates.slice(0, idx);
    if (!!domNode.officesMap.traveledPoly) {
      domNode.officesMap.traveledPoly.setMap(null)
    }
    domNode.officesMap.traveledPoly = new google.maps.Polyline({
      path: traveledPath,
      geodesic: true,
      strokeColor: 'rgb(255,82,64)',
      strokeOpacity: 1,
      strokeWeight: 6
    });
    domNode.officesMap.traveledPoly.setMap(domNode.officesMap.map);

    // The rest of the way to the new office
    // -1 for the first bit (line needs two ends)
    let futurePath = domNode.officesMap.pathCoordinates.slice(idx - 1);
    if (!!domNode.officesMap.futurePoly) {
      domNode.officesMap.futurePoly.setMap(null);
    }
    domNode.officesMap.futurePoly = new google.maps.Polyline({
      path: futurePath,
      geodesic: true,
      strokeColor: 'rgb(255,82,64)',
      strokeOpacity: 0.6,
      strokeWeight: 2
    });
    domNode.officesMap.futurePoly.setMap(domNode.officesMap.map);
  }

  destroy(domNode) { }
}

module.exports = OfficesMap;
