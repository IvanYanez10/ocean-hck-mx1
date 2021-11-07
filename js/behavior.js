
// init values
document.getElementById("content-title").innerHTML = 'Introduccion'; 
document.getElementById("content-info").innerHTML = cuencasBalsasData['Introduccion'].content;
document.getElementById("info-container").classList.toggle('scrollable-section');

var onLayerChange = (layerName) => {    

  var img = new Image();  

  document.getElementById("content-title").innerHTML = layerName;
  
  document.getElementById("info-container").innerHTML = cuencasBalsasData[layerName].content;

  if (cuencasBalsasData[layerName].link) {
    img.src = cuencasBalsasData[layerName].link;
    document.getElementById("cuenca-image").appendChild(img);
  }

  var containerClass = document.getElementById("info-container").classList.value;
  
  if (layerName === "Estados" && containerClass.includes("scrollable")) {

    document.getElementById("info-container").classList.toggle('scrollable-section');
    return;

  } else if (layerName === "Estados" && !containerClass.includes("scrollable")) {
    return;
  }
  
  if ((cuencasBalsasData[layerName]['content'].length > 600 || cuencasBalsasData[layerName]['link']) && !containerClass.includes("scrollable")) {
    document.getElementById("info-container").classList.toggle('scrollable-section');

  } else if (cuencasBalsasData[layerName]['content'].length < 600 && containerClass.includes("scrollable")) {
    document.getElementById("info-container").classList.toggle('scrollable-section');
  }

};