
var token = "pk.eyJ1IjoiaXZhbmNyIiwiYSI6ImNrNzB1ZDB2eDAwOHEzZm5tM2RldmhmeHIifQ.sQ-BVnhKcwSTtbnoTmeziQ"; // token de https://account.mapbox.com/

bounds = [
  [18.6126, -100.3621],
  [17.8847, -100.2941]
];

var map = L.map('map', {
  minZoom: 9,
  // maxBounds: bounds,
  center: [18.0850481, -101.2141835],
  zoom: 6,
  animate: true,
  zoomControl: false,
  layers: someLayers
  // maxBoundsViscosity: 1.0
});
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

var riosLayer = L.geoJSON(riosData, {
  color: "#fff",
  weight: 1,
  opacity: .7,
});
riosLayer.addTo(map); // default
var cuencasLayer = L.geoJSON(cuencasBalsas, {
  color: "#fff",
  weight: 1,
  opacity: .7,
});

//var punto = L.marker([18.0850481, -101.2141835]).bindPopup('centro');

var someLayers = {
  "Rios": riosLayer,
  "Cuencas": cuencasLayer
};
/*
var overlayMaps = {
  "Puntazo": punto
};*/

L.mapboxGL({
  accessToken: token,
  style: 'mapbox://styles/mapbox/dark-v10',
}).addTo(map);
//, overlayMaps
L.control.layers(someLayers, {
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

var popup = L.popup({autoClose:false})
  .setLatLng([18.0853, -101.215])
  .setContent("<b>usr </b><br/>tweet ").openOn(map);
//popup.isRandom = true;
map.addLayer(popup);