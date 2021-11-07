
var token = "pk.eyJ1IjoiaXZhbmNyIiwiYSI6ImNrNzB1ZDB2eDAwOHEzZm5tM2RldmhmeHIifQ.sQ-BVnhKcwSTtbnoTmeziQ"; // token de https://account.mapbox.com/

/* mapas base */
var terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
  subdomains: 'abcd',
  minZoom: 2,
  maxZoom: 13,
  ext: 'png'
});

var hidro = new L.tileLayer.wms(
  'https://ide.sedatu.gob.mx:8080/geonode/wms?', {
    layers: ['inegi_RH00_ha_4326'],
});

var mapbox = L.mapboxGL({
  accessToken: token,
  style: 'mapbox://styles/mapbox/light-v10',
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
var estados_layer = L.geoJSON(estados_data, {
  style: () => {
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
    onEachFeature: function (features, layer) {
      var circles_colors = {
        "Excelente": {
          link: 'https://ocean-hck-mx1.website/data/dbo05/circle-excelente.png'
        },
        "Buena Calidad": {
          link: 'https://ocean-hck-mx1.website/data/dbo05/circle-bueno.png'
        },
        "Aceptable": {
          link: 'https://ocean-hck-mx1.website/data/dbo05/circle-aceptable.png'
        },
        "Contaminada": {
          link: 'https://ocean-hck-mx1.website/data/dbo05/circle-contaminada.png'
        },
        "Fuertemente Contaminada": {
          link: 'https://ocean-hck-mx1.website/data/dbo05/circle-fuertemente-contaminada.png'
        }
      };
      let iterableCirclesColors = Object.entries(circles_colors);

      var colorCircle = iterableCirclesColors.find(col => {
        return features['properties'].dbo_clas === col[0]
      });

      var ico = L.icon({
        iconUrl: colorCircle[1].link,
        iconSize: [25, 25],
        iconAnchor: [15, 15],
        popupAnchor: [-10, -10]
      });
      layer.setIcon(ico);
      
    },
    opacity: 0.8,
    fillOpacity: 0.8,
    color: 'blue',
    weight: 1.0,
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
/* propiedades de la capa de indice_marginidad_2010_layer */
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

      //console.log('mun: ' + feature['properties']['CVE_ENT']);

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
/* propiedades de la capa de indice_marginidad_2015_layer */
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

     // console.log('mun: ' + feature['properties']['CVE_ENT']);
            
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

/* propiedades de la capa de usv_2005_layer */
var usv_2005_layer = L.geoJSON(usv_2005_data, {
  style: () => {
      var color = Math.floor(Math.random() * 16777215).toString(16);
      return {
        fillColor: `#${color}`,
        opacity: 0.3,
        fillOpacity: 0.2,
        color: `#${color}`,
        weight: 0.8,
      }
    }
  }
);

/* propiedades de la capa de usv_2016_layer */
var usv_2016_layer = L.geoJSON(usv_2016_data, {
    style: () => {
      var color = Math.floor(Math.random() * 16777215).toString(16);
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

dbo05_layer.eachLayer(function (layer) {
  layer.bindPopup(`<strong> Nombre: </strong> ${layer.feature.properties.nom_emca} <br>
  <strong> Estado: </strong> ${layer.feature.properties.nom_edo} <br>
  <strong> Municipio: </strong> ${layer.feature.properties.nom_mpio} <br>
  <strong> Cuerpo agua: </strong> ${layer.feature.properties.cuer_agu} <br>
  `);
});




// actualizar weas
/*
var info = L.control();

info.onAdd = function(map){
  this._div = L.DomUtil.create('div','info');
  this.update();
  return this._div;
}
info.update = function(props){
  this._div.innerHTML = 
  '<h5>Información de los Rios</h5>' +
  (props ? `<b> ID: ${props.OBJECTID}</b><br> 
    <b>ENTIDAD: ${props.ENTIDAD}<b><br>
    <b>TIPO: ${props.TIPO}<b><br>` : "Pasa el puntero por un Rio")
  ;
}*/

//actualiza la informacion del div
function updateFeature(e){
  var layer = e.target;

  info.update(layer.feature.properties);
}

//resetea la informacion
function resetFeature(e){
  info.update();
}

// se asignan a todos los rios estos eventos
rios_layer.eachLayer(function (layer) {
  layer.on({
    mouseover: updateFeature,
    mouseout: resetFeature
  });
});

/*
map.on('loading', function (event) {
  console.log('start loading tiles');
});/*
map.on('load', function (event) {
  console.log('all tiles loaded');
});*/

var base_layers = {
  "Mapbox": mapbox,
  "Hidrografía": hidro,
  "Terrain": terrain,
};

var data_layers = {
  "Rios": rios_layer,
  "Cuencas": cuencas_layer,
  "Estados": estados_layer,
  "Edafologia": edafologia_layer,
  "Demanda de Oxigeno": dbo05_layer,
  "Indice de marginidad 2010": indice_marginidad_2010_layer,
  "Indice de marginidad 2015": indice_marginidad_2015_layer,
  "USV 2005": usv_2005_layer,
  "USV 2016": usv_2016_layer
};

// overlayMaps
L.control.layers(base_layers, data_layers, {
  position: 'topright',
  collapsed: false
}).addTo(map);

/* Scale control */
L.control.scale({
  position: 'bottomright'
}).addTo(map);

/* zoom */
L.control.zoom({
  position: 'bottomright'
}).addTo(map);

var info = L.control();

info.onAdd = function () {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
}
info.update = function () {
  this._div.innerHTML =
  "<h5>Acotacion</h5><hr>"+
  "<div class='px-1 d-block'><div class='d-inline' style='width:10px;height:10px;background-color:green;border-radius:2px;'></div><div class='d-inline float-end'>some</div></div>"+
  "<div class='px-1 d-block'><div class='d-inline' style='width:10px;height:10px;background-color:red;border-radius:2px;'></div><div class='d-inline float-end'>some 1</div></div>"+
  "<div class='px-1 d-block'><div class='d-inline' style='width:10px;height:10px;background-color:blue;border-radius:2px;'></div><div class='d-inline float-end'>some 2</div></div>";
}

map.on('overlayadd', e => {
  onLayerChange(e.name);
  if(cuencasBalsasData[e.name]['acotaciones']){
    info.addTo(map);
  }else{
    info.remove();
  }
});