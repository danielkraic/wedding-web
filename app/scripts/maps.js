function initialize(elementName, latitude, longitude, placeName) {
  var map;
  var placeGps = new google.maps.LatLng(latitude, longitude);
  var mapCanvas = document.getElementById(elementName);
  var mapOptions = {
    center: placeGps,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(mapCanvas, mapOptions)

  var contentString = '<div id="content">'+
                      '<p>' + placeName + '</p>'+
                      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  var marker = new google.maps.Marker({
      position: placeGps,
      map: map,
      animation: google.maps.Animation.DROP,
      title: placeName
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

var initializeAll = function() {
  initialize('map-zakopcie', 49.405132, 18.732120, 'Kostol sv. Jána Krstiteľa, Zákopčie');
  initialize('map-korna', 49.411975, 18.569093, 'Penzión Kriváň, Korňa');
}

google.maps.event.addDomListener(window, 'load', initializeAll);
