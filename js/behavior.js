
document.getElementById("content-title").innerHTML = 'Introduccion';
document.getElementById("content-info").innerHTML = cuencasBalsasData['Introduccion'].content;

var onLayerChange = (layerName) => {  

  if (layerName === "Cuencas"){

    document.getElementById("content-title").innerHTML = layerName;

    if (cuencasBalsasData[layerName].link) {
      var img = new Image();
      img.src = cuencasBalsasData[layerName].link;
      document.getElementById("info-container").appendChild(img);
    }

    document.getElementById("content-info").innerHTML = cuencasBalsasData[layerName].content;
    
  }else{
    document.getElementById("content-title").innerHTML = layerName;
    document.getElementById("content-info").innerHTML = cuencasBalsasData[layerName].content;

    if (cuencasBalsasData[layerName].link) {
      var img = new Image();
      img.src = cuencasBalsasData[layerName].link;
      document.getElementById("content-info").appendChild(img);
    }
  }

};