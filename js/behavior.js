
document.getElementById("content-title").innerHTML = 'Introduccion';
document.getElementById("content-info").innerHTML = cuencasBalsasData['Introduccion'].content;

var onLayerChange = (layerName) => {
  document.getElementById("content-title").innerHTML = layerName;
  document.getElementById("content-info").innerHTML = cuencasBalsasData[layerName].content;
};