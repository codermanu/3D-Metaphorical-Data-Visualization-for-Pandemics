/**
* Author: Dulya Murage
*/
function getCoordinate(x, y, config) {
    // returns cordinates to a given x,y inside a plane containing google static map
    /*
     // Sample Config
     var config = {
        lat: 53.4055429, // center lat
        lng: -2.9976502, // center lng
        zoom: 14.5,
        size: {
            x: 512,
            y: 512,
        }
      };
    */
    var degreesPerPixelX = 360 / Math.pow(2, config.zoom + 8);
    var degreesPerPixelY = 360 / Math.pow(2, config.zoom + 8) * Math.cos(config.lat * Math.PI / 180);

    return new google.maps.LatLng(config.lat - degreesPerPixelY * ( y - config.size.y / 2), config.lng + degreesPerPixelX * ( x  - config.size.x / 2));
}
