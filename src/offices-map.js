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
      [60.154554, 24.886893],
      [60.154788, 24.886421],
      [60.155002, 24.885863],
      [60.155216, 24.885305],
      [60.155493, 24.885005],
      [60.155920, 24.885305],
      [60.156283, 24.885477],
      [60.156689, 24.885649],
      [60.156988, 24.885692],
      [60.157266, 24.885777],
      [60.157629, 24.885906],
      [60.157971, 24.886078],
      [60.158270, 24.886207],
      [60.158590, 24.886507],
      [60.158846, 24.886850],
      [60.159102, 24.887194],
      [60.159316, 24.887451],
      [60.159594, 24.887794],
      [60.159871, 24.888095],
      [60.160149, 24.888481],
      [60.160405, 24.888739],
      [60.160640, 24.889039],
      [60.160896, 24.889296],
      [60.161088, 24.889726],
      [60.161131, 24.890326],
      [60.161195, 24.890927],
      [60.161259, 24.891485],
      [60.161323, 24.892043],
      [60.161409, 24.892558],
      [60.161451, 24.892954],
      [60.161505, 24.893330],
      [60.161547, 24.893620],
      [60.161601, 24.894017],
      [60.161649, 24.894338],
      [60.161707, 24.894821],
      [60.161782, 24.895325],
      [60.161836, 24.895819],
      [60.161905, 24.896388],
      [60.161969, 24.896870],
      [60.162038, 24.897364],
      [60.162108, 24.897879],
      [60.162188, 24.898469],
      [60.162257, 24.898973],
      [60.162343, 24.899585],
      [60.162412, 24.900164],
      [60.162508, 24.900926],
      [60.162588, 24.901495],
      [60.162658, 24.902074],
      [60.162722, 24.902600],
      [60.162812, 24.903136],
      [60.162903, 24.903630],
      [60.163069, 24.904080],
      [60.163266, 24.904520],
      [60.163522, 24.905164],
      [60.163688, 24.905529],
      [60.163859, 24.906086],
      [60.163997, 24.906644],
      [60.164126, 24.907267],
      [60.164163, 24.907782],
      [60.164200, 24.908318],
      [60.164216, 24.908833],
      [60.164232, 24.909391],
      [60.164264, 24.910153],
      [60.164280, 24.910796],
      [60.164307, 24.911462],
      [60.164318, 24.912416],
      [60.164355, 24.913425],
      [60.164382, 24.914208],
      [60.164414, 24.915152],
      [60.164467, 24.916365],
      [60.164510, 24.917717],
      [60.164526, 24.918564],
      [60.164547, 24.919379],
      [60.164590, 24.920302],
      [60.164638, 24.921450],
      [60.164681, 24.922051],
      [60.164750, 24.922791],
      [60.164793, 24.923489],
      [60.164852, 24.924454],
      [60.164921, 24.925077],
      [60.165006, 24.925624],
      [60.165182, 24.926300],
      [60.165343, 24.926761],
      [60.165556, 24.927490],
      [60.165754, 24.927995],
      [60.165946, 24.928585],
      [60.166127, 24.929132],
      [60.166346, 24.929711],
      [60.166469, 24.930602],
      [60.166784, 24.930956],
      [60.167125, 24.931128],
      [60.167456, 24.931246],
      [60.167392, 24.931943],
      [60.167499, 24.932662],
      [60.167659, 24.933220],
      [60.167872, 24.933842],
      [60.168118, 24.934582],
      [60.168273, 24.934968],
      [60.168438, 24.934765],
      [60.168737, 24.934314],
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
      strokeColor: 'rgb(255,82,64)',
      strokeOpacity: 1,
      strokeWeight: 6
    });
    domNode.officesMap.traveledPoly.setMap(domNode.officesMap.map);
    traveledPath = null;

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
      strokeColor: 'rgb(255,82,64)',
      strokeOpacity: 0.6,
      strokeWeight: 2
    });
    domNode.officesMap.futurePoly.setMap(domNode.officesMap.map);
    futurePath = null;
  }

  destroy(domNode) { }
}

module.exports = OfficesMap;
