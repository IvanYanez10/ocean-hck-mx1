
var token = "pk.eyJ1IjoiaXZhbmNyIiwiYSI6ImNrNzB1ZDB2eDAwOHEzZm5tM2RldmhmeHIifQ.sQ-BVnhKcwSTtbnoTmeziQ"; // token de https://account.mapbox.com/

/* mapas base */
var terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 2,
  maxZoom: 13,
  ext: 'png'
});

var hidro = new L.tileLayer.wms(
  'https://ide.sedatu.gob.mx:8080/geonode/wms?', {
    layers: ['inegi_RH00_ha_4326'],
});

bounds = [
  [20.5425567949938, -104.04605780192112],
  [16.82076865916644, -96.78747132978744]
];
/* propiedades de la capa de rios */
var rios_layer = L.geoJSON(rios_data,
  {
    fillColor: 'green',
    opacity: 0.8,
    fillOpacity: 0.8,
    color: 'blue',
    weight: 0.8,
  }
);
/* propiedades de la capa de cuenca */
var cuencas_layer = L.geoJSON(cuencas_balsas_data,
  {
    fillColor: '#4e5257',
    opacity: 0.6,
    fillOpacity: 0.5,
    color: '#4e5257',
    weight: 0.5,
  }
);
/* propiedades de la capa de estados */
var estados_layer = L.geoJSON(estados_data,
  {
    style: function (feature) {
      var color = Math.floor(Math.random() * 16777215).toString(16);
      //console.log(`estado: ${feature['properties']['NOM_EDO']} color: #${color}`);
      return { 
        fillColor: `#${color}`,
        opacity: 0.3,
        fillOpacity: 0.2,
        color: `#${color}`,
        weight: 0.8,
      };
    }    
  }
);
/* propiedades de la capa de rios */
var dbo05_layer = L.geoJSON(dbo05_data,
  {
    fillColor: 'green',
    opacity: 0.8,
    fillOpacity: 0.8,
    color: 'blue',
    weight: 0.8,
  }
);
/* propiedades de la capa de cuenca */
var edafologia_layer = L.geoJSON(edafologia_data,
  {
    fillColor: '#4e5257',
    opacity: 0.6,
    fillOpacity: 0.5,
    color: '#4e5257',
    weight: 0.5,
  }
);
/* propiedades de la capa de estados */
var indice_marginidad_2010_layer = L.geoJSON(indice_marginidad_2010_data,
  {
    style: function (feature) {

      var colors = {
        'Muy alto': {
          color: '#8B323C'
        },
        "Alto": {
          color: '#904432'
        },
        "Medio": {
          color: '#956232'
        },
        "Bajo": {
          color: '#9A8433'
        },
        "Muy bajo": {
          color: '#959F33'
        }
      };
      let iterableColors = Object.entries(colors);

      var color = iterableColors.find(col => {
        return feature['properties']['GM'] === col[0]
      });

      console.log('mun: ' + feature['properties']['CVE_ENT']);

      return {
        fillColor: color[1].color,
        opacity: 0.8,
        fillOpacity: 0.8,
        color: color[1].color,
        weight: 1.0,
      };
    }
  }
);
/* propiedades de la capa de estados */
var indice_marginidad_2015_layer = L.geoJSON(indice_marginidad_2015_data,
  {
    style: function (feature) {

      var colors = {
        'Muy alto': {
          color: '#8B323C'
        },
        "Alto": {
          color: '#904432'
        },
        "Medio": {
          color: '#956232'
        },
        "Bajo": {
          color: '#9A8433'
        },
        "Muy bajo": {
          color: '#959F33'
        }
      };
      let iterableColors = Object.entries(colors); 

      var color = iterableColors.find(col => {
        return feature['properties']['GM'] === col[0]
      });

      console.log('mun: ' + feature['properties']['CVE_ENT']);
            
      return {
        fillColor: color[1].color,
        opacity: 0.8,
        fillOpacity: 0.8,
        color: color[1].color,
        weight: 1.0,
      };
    }
  }
);

/* creacion y propiedades del mapa */
var map = L.map('map', {
  minZoom: 8,
  maxBounds: bounds,
  center: [18.317839945318163, -100.28181854410033],
  zoom: 6,
  animate: true,
  zoomControl: false,
  layers: [   // default values
    terrain, 
    estados_layer
  ]
});
/*
map.on('loading', function (event) {
  console.log('start loading tiles');
});
map.on('load', function (event) {
  console.log('all tiles loaded');
});*/

var base_layers = {
  "Hidrografía SEDATU": hidro,
  "Stamen terrain": terrain,
};

var data_layers = {
  "Rios": rios_layer,
  "Cuencas": cuencas_layer,
  "Estados": estados_layer,
  "Edafologia": edafologia_layer,
  "DBO05": dbo05_layer,
  "Indice de marginidad 2010": indice_marginidad_2010_layer,
  "Indice de marginidad 2015": indice_marginidad_2015_layer  
};

L.mapboxGL({
  accessToken: token,
  style: 'mapbox://styles/mapbox/light-v10',
}).addTo(map);

// overlayMaps
L.control.layers(base_layers, data_layers, {
  position: 'topright',
  collapsed: false
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