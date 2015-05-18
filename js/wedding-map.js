var map;
var weddingPlace = new google.maps.LatLng(49.411975, 18.569093);

function initialize() {
  var mapCanvas = document.getElementById('map-canvas');
  var mapOptions = {
    center: weddingPlace,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(mapCanvas, mapOptions)

  var contentString = '<div id="content">'+
                      '<p>Penzión Kriváň, Korňa</p>'+
                      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  var marker = new google.maps.Marker({
      position: weddingPlace,
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Penzión Kriváň, Korňa'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);