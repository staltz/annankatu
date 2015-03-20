import Immutable from 'immutable';

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
      [60.15455, 24.88689],
      [60.15478, 24.88642],
      [60.15500, 24.88586],
      [60.15521, 24.88550],
      [60.15526, 24.88521],
      [60.15527, 24.88509],
      [60.15527, 24.88509],
      [60.15637, 24.88548],
      [60.15644, 24.88555],
      [60.15696, 24.88561],
      [60.15696, 24.88561],
      [60.15701, 24.88578],
      [60.15709, 24.88586],
      [60.15718, 24.88584],
      [60.15726, 24.88572],
      [60.15790, 24.88604],
      [60.15822, 24.88613],
      [60.15845, 24.88632],
      [60.15920, 24.88716],
      [60.16105, 24.88947],
      [60.16105, 24.88947],
      [60.16118, 24.89101],
      [60.16130, 24.89205],
      [60.16156, 24.89380],
      [60.16162, 24.89394],
      [60.16174, 24.89480],
      [60.16174, 24.89480],
      [60.16254, 24.90084],
      [60.16254, 24.90084],
      [60.16254, 24.90112],
      [60.16288, 24.90357],
      [60.16354, 24.90516],
      [60.16354, 24.90516],
      [60.16364, 24.90499],
      [60.16364, 24.90499],
      [60.16387, 24.90558],
      [60.16404, 24.90619],
      [60.16418, 24.90675],
      [60.16427, 24.90763],
      [60.16444, 24.90774],
      [60.16479, 24.90771],
      [60.16487, 24.90780],
      [60.16500, 24.90808],
      [60.16500, 24.90808],
      [60.16536, 24.90940],
      [60.16572, 24.91135],
      [60.16595, 24.91235],
      [60.16603, 24.91446],
      [60.16603, 24.91446],
      [60.16620, 24.91450],
      [60.16630, 24.91473],
      [60.16661, 24.91569],
      [60.16671, 24.91634],
      [60.16671, 24.91634],
      [60.16668, 24.91648],
      [60.16684, 24.92109],
      [60.16684, 24.92109],
      [60.16698, 24.92116],
      [60.16705, 24.92127],
      [60.16778, 24.92136],
      [60.16778, 24.92136],
      [60.16780, 24.92181],
      [60.16784, 24.92214],
      [60.16810, 24.92300],
      [60.16810, 24.92300],
      [60.16808, 24.92324],
      [60.16810, 24.92340],
      [60.16867, 24.92476],
      [60.16871, 24.92497],
      [60.16870, 24.92522],
      [60.16933, 24.92701],
      [60.16934, 24.92712],
      [60.16931, 24.92714],
      [60.16931, 24.92714],
      [60.16941, 24.92735],
      [60.16941, 24.92735],
      [60.16867, 24.92871],
      [60.16853, 24.92898],
      [60.16847, 24.92891],
      [60.16839, 24.92896],
      [60.16836, 24.92911],
      [60.16840, 24.92924],
      [60.16773, 24.93048],
      [60.16750, 24.93092],
      [60.16750, 24.93092],
      [60.16743, 24.93092],
      [60.16738, 24.93102],
      [60.16738, 24.93115],
      [60.16743, 24.93125],
      [60.16750, 24.93125],
      [60.16754, 24.93117],
      [60.16818, 24.93155],
      [60.16818, 24.93155],
      [60.16899, 24.93400],
      [60.16899, 24.93400],
      [60.16875, 24.93434],
      [newOfficeCoords[0], newOfficeCoords[1]]
    ]
    .map(([lat, lng]) => new google.maps.LatLng(lat, lng))

    let element = document.createElement('div');
    element.style.height = '100%';
    element.style.width = '100%';
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.zIndex = '0';

    let mapColor = "#CCEDE3";

    let commonStylers = [
      { "color": mapColor }
    ];

    let mapStyles = [
      {
        "stylers": [
          { "gamma": 0.75 },
          { "lightness": -4 }
        ]
      },{
        "elementType": "labels",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "road",
        "stylers": [
          { "saturation": -40 },
          { "hue": mapColor }
        ]
      },{
        "featureType": "water",
        "stylers": [
          { "color": "#eeeeee" }
        ]
      },{
        "featureType": "landscape",
        "stylers": commonStylers
      },{
        "featureType": "poi",
        "stylers": commonStylers
      },{
        "featureType": "transit",
        "stylers": commonStylers
      },{
        "featureType": "administrative",
        "stylers": commonStylers
      }
    ];

    let mapOptions = {
      zoom: 14,
      streetViewControl: false,
      scaleControl: false,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scrollwheel: true,
      center: mapCenterPointPosition,
      draggable: true,
      styles: mapStyles
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
      title: 'The Old Futurice Office',
      icon: 'images/old-logo-marker.png'
    });
    let marker2 = new google.maps.Marker({
      position: newOfficePosition,
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      title: 'The New Futurice Office',
      icon: 'images/logo-marker.png'
    });

    google.maps.event.addListener(marker2, 'click', () =>
      window.location.href = 'http://www.futurice.com/'
    );

    this.update(null, element);
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
      domNode.officesMap.traveledPoly.setMap(null);
      domNode.officesMap.traveledPoly = null;
    }
    domNode.officesMap.traveledPoly = new google.maps.Polyline({
      path: traveledPath,
      geodesic: true,
      strokeColor: 'rgb(0,90,75)',
      strokeOpacity: 1,
      strokeWeight: 7
    });
    domNode.officesMap.traveledPoly.setMap(domNode.officesMap.map);
    traveledPath = null;

    // Where we are now
    if (!!domNode.officesMap.olegBike) {
      domNode.officesMap.olegBike.setPosition(
        domNode.officesMap.pathCoordinates[idx]
      );
    } else {
      domNode.officesMap.olegBike = new google.maps.Marker({
        position: domNode.officesMap.pathCoordinates[idx],
        draggable: false,
        clickable: true,
        map: domNode.officesMap.map,
        title: '@phadej',
        icon: 'images/olegbike_blk_small.png'
      });
      google.maps.event.addListener(domNode.officesMap.olegBike, 'click', () =>
        window.location.href = 'https://vimeo.com/122725089'
      );
    }

    // The rest of the way to the new office
    // -1 for the first bit (line needs two ends)
    let futurePath = domNode.officesMap.pathCoordinates.slice(idx - 1);
    if (!!domNode.officesMap.futurePoly) {
      domNode.officesMap.futurePoly.setMap(null);
      domNode.officesMap.futurePoly = null;
    }
    domNode.officesMap.futurePoly = new google.maps.Polyline({
      path: futurePath,
      geodesic: true,
      strokeColor: 'rgb(0,90,75)',
      strokeOpacity: 1,
      strokeWeight: 2
    });
    domNode.officesMap.futurePoly.setMap(domNode.officesMap.map);
    futurePath = null;
  }

  destroy(domNode) { }
}

module.exports = OfficesMap;
