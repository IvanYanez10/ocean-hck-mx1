
var token = "pk.eyJ1IjoiaXZhbmNyIiwiYSI6ImNrNzB1ZDB2eDAwOHEzZm5tM2RldmhmeHIifQ.sQ-BVnhKcwSTtbnoTmeziQ"; // token de https://account.mapbox.com/

/* mapas base */
var terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 2,
  maxZoom: 13,
  ext: 'png'
});

var hidro = new L.tileLayer.wms('https://ide.sedatu.gob.mx:8080/geonode/wms?', {
  layers: ['inegi_RH00_ha_4326'],
});

bounds = [
  [20.5425567949938, -104.04605780192112],
  [16.82076865916644, -96.78747132978744]
];

var riosLayer = L.geoJSON(riosData,
  {
    fillColor: 'green',
    opacity: 0.8,
    fillOpacity: 0.8,
    color: 'blue',
    weight: 0.8,
  }
);

// riosLayer.addTo(map); // default
var cuencasLayer = L.geoJSON(cuencasBalsas,
  {
    fillColor: '#4e5257',
    opacity: 0.6,
    fillOpacity: 0.5,
    color: '#4e5257',
    weight: 0.5,
  }
);

var edos = L.geoJSON(estados,
  {
    fillColor: 'green',
    opacity: 0.3,
    fillOpacity: 0.2,
    color: 'black',
    weight: 0.5,
  }
);

var map = L.map('map', {
  minZoom: 8,
  maxBounds: bounds,
  center: [18.317839945318163, -100.28181854410033],
  zoom: 6,
  animate: true,
  zoomControl: false,
  layers: [terrain,hidro, edos]
  // maxBoundsViscosity: 1.0
}).addTo(map).pop;
/*
map.on('dragend', function(event) {
  if(true){
    map.panTo([center]);
  }
});*/
map.on('loading', function (event) {
  console.log('start loading tiles');
});
map.on('load', function (event) {
  console.log('all tiles loaded');
});


//var punto = L.marker([18.0850481, -101.2141835]).bindPopup('centro');

var someLayers = {
  "Hidrografía SEDATU": hidro,
  "Stamen terrain": terrain,
};

var overlayMaps = {
  "Rios": riosLayer,
  "Cuencas": cuencasLayer,
  "estados" : edos
};

// L.mapboxGL({
//   accessToken: token,
//   style: 'mapbox://styles/mapbox/white-v10',
// }).addTo(map);

//, overlayMaps
L.control.layers(someLayers, overlayMaps, {
  position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
  collapsed: false // true
}).addTo(map);
// map.dragging.disable();

/* Scale control */
L.control.scale({
  position: 'bottomright'
}).addTo(map);

/* zoom */
L.control.zoom({
  position: 'bottomright'
}).addTo(map);

// var popup = L.popup({autoClose:false})
//   .setLatLng([18.0853, -101.215])
//   .setContent("<b>usr </b><br/>tweet ").openOn(map);
//popup.isRandom = true;
//map.addLayer(popup);