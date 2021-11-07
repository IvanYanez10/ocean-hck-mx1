
/* mapas base */
var terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
  attribution: '&copy;stamen-tiles contributors',
  subdomains: 'abcd',
  minZoom: 2,
  maxZoom: 13,
  ext: 'png'
});

var hidro = new L.tileLayer.wms(
  'https://ide.sedatu.gob.mx:8080/geonode/wms?', {
    layers: ['inegi_RH00_ha_4326'],
});

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 1,
  maxZoom: 16,
  ext: 'jpg'
});

var CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20
});

bounds = [
  [20.5425567949938, -104.04605780192112],
  [16.82076865916644, -96.78747132978744]
];
/* propiedades de la capa de rios */
var rios_layer = L.geoJSON(rios_data,
  {
    opacity: 0.9,
    color: 'blue',
    weight: 0.9,
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

var social_2008_layer = L.geoJSON(social_2008_data,
  {
    fillColor: 'red',
    opacity: 0.6,
    fillOpacity: 0.5,
    color: 'red',
    weight: 0.5,
  });

var vulnerabilidad_layer = L.geoJSON(vulnerabilidad_data,
  {
    fillColor: '#4e5257',
    opacity: 0.6,
    fillOpacity: 0.5,
    color: '#4e5257',
    weight: 0.5,
  });

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
// TODO: colores seguimiento del rio colores azules
/* propiedades de la capa de edafologia */
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
var indice_marginidad_2010_layer = L.geoJSON(indice_marginidad_2010_data, {
    style: (feature)  => {
      var colors = {
        'Muy alto': {
          color: '#8B2F2E'
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
          color: '#99D88A'
        }
      };
      let iterableColors = Object.entries(colors);

      var color = iterableColors.find(col => {
        return feature['properties']['GM'] === col[0]
      });

      return {
        fillColor: color[1].color,
        opacity: 0.5,
        fillOpacity: 0.5,
        color: color[1].color,
        weight: 1.1,
      };
    }
  }
);
/* propiedades de la capa de indice_marginidad_2015_layer */
var indice_marginidad_2015_layer = L.geoJSON(indice_marginidad_2015_data, {
    style: (feature) => {
      var colors = {
        'Muy alto': {
          color: '#8B323C' // #8B323C
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
      return {
        fillColor: color[1].color,
        opacity: 0.5,
        fillOpacity: 0.5,
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
var usv_2017_layer = L.geoJSON(usv_2017_data, {
  style: feature => {
    //console.log(feature['properties']['DESCRIPCIO']);
    var color = Math.floor(Math.random() * 16777215).toString(16); //DESCRIPCIO
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


/* propiedades de la capa de usv_2016_layer */
var social_2008_layer = L.geoJSON(social_2008_data, {
  style: feature => {
    var color = Math.floor(Math.random() * 16777215).toString(16); //DESCRIPCIO
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


/* propiedades de la capa de usv_2016_layer */
var social_2018_layer = L.geoJSON(social_2018_data, {
  style: feature => {
    var color = Math.floor(Math.random() * 16777215).toString(16); //DESCRIPCIO
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


/* propiedades de la capa de usv_2016_layer */
var vulnerabilidad_contaminacion_layer = L.geoJSON(vulnerabilidad_contaminacion_data, {
  style: (feature) => {
    var colors = {
      'Muy Alta': {
        color: '#8B323C'
      },
      "Alta": {
        color: '#904432'
      },
      "Media": {
        color: '#956232'
      },
      "Baja": {
        color: '#9A8433'
      },
      "Muy Baja": {
        color: '#959F33'
      }
    };
    let iterableColors = Object.entries(colors);

    var color = iterableColors.find(col => {
      return feature['properties']['Vulnerabil'] === col[0]
    });
    console.log(color);
    return {
      fillColor: color[1].color,
      opacity: 0.5,
      fillOpacity: 0.5,
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

dbo05_layer.eachLayer(function (layer) {
  layer.bindPopup(`<strong> Nombre: </strong> ${layer.feature.properties.nom_emca} <br>
  <strong> Estado: </strong> ${layer.feature.properties.nom_edo} <br>
  <strong> Municipio: </strong> ${layer.feature.properties.nom_mpio} <br>
  <strong> Cuerpo agua: </strong> ${layer.feature.properties.cuer_agu} <br>
  `);
});
//
indice_marginidad_2010_layer.eachLayer(function (layer) {
  layer.bindPopup(`<strong> Estado: </strong> ${layer.feature.properties.NOM_ENT} <br>
  <strong> Municipio: </strong> ${layer.feature.properties.NOM_MUN} <br>
  <strong> Poblacion total: </strong> ${layer.feature.properties.POB_TOT} <br>`);
});

indice_marginidad_2015_layer.eachLayer(function (layer){
  layer.bindPopup(`<strong> Estado: </strong> ${layer.feature.properties.NOM_ENT} <br>
  <strong> Municipio: </strong> ${layer.feature.properties.NOM_MUN} <br>
  <strong> Poblacion total: </strong> ${layer.feature.properties.POB_TOT} <br>`);
});

usv_2017_layer.eachLayer(function (layer){
  layer.bindPopup(`<strong> Estado: </strong> ${layer.feature.properties.DESCRIPCIO} <br>`);
});

// vulnerabilidad_layer.eachLayer(function (layer){
//   layer.bindPopup(`<strong>Nivel: </strong> ${layer.feature.properties.Vulnerabil} <br>`);
// })

function getColor(tipo) {
  return tipo === "Muy Baja" ? "#fdb777"  :
         tipo === "Baja" ? "#fda766" :
         tipo === "Media" ? "#fd9346" : 
         tipo === "Alta" ? "#fd7f2c" :
         tipo === "Muy Alta" ? "#ff6200" :
          "#ffffff";
}

function style(feature){
  return {
    fillColor : getColor(feature.properties.Vulnerabil),
    // weight: 2,
    // opacity: 1,
    // color: 'white',
    // dashArray: '3',
    fillOpacity : 0.7
  }
}

vulnerabilidad_layer.setStyle(style);


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



var base_layers = {
 // "Topografico": OpenTopoMap,
 // "Watercolor": Stamen_Watercolor,
 // "Street map": OpenStreetMap_Mapnik,
  "Hidrografía": hidro,
  "Terrain": terrain,
  "Sin leyendas": CartoDB_PositronNoLabels
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
  "USV 2017": usv_2017_layer,
  "Social 2008": social_2008_layer,
  "Social 2018": social_2018_layer,
  "Vulnerabilidad contaminacion": vulnerabilidad_contaminacion_layer
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

info.onAdd = function (props) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
}
var c;
var generateAcotaciones = layer => {
  c = "<h5 class='ps-3'>Acotacion</h5><hr>";
  
  let iterableAnot = Object.entries(cuencasBalsasData[layer]['acotaciones']);

  iterableAnot.map(anot => { //style='background-color:${anot[1].color}'
    c += `<div class='mx-2 row row-cols-2'>
            <div class='col ps-2'> <span class='px-3' style='width:100%;height:100%;background-color:${anot[1].color};border-radius:5px;'></span> </div>
            <div class='col'> <p class='float-end text-end'>${anot[0]}</p> </div>
          </div>
          <br>`
  });
}

info.update = function () {
  this._div.innerHTML = c;
}

map.on('overlayadd', e => {
  onLayerChange(e.name);
  if(cuencasBalsasData[e.name]['acotaciones']){
    generateAcotaciones(e.name);
    info.addTo(map);
  }else{
    info.remove();
  }
});


map.on('loading', function (event) {
  console.log('start loading tiles');
});
map.on('load', function (event) {
  //document.getElementById("panel")
  // load element when its time
  console.log('all tiles loaded'+event);
});