// sets the access token, associating the map with your Mapbox account and its permissions
mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // get your mapbox accessToken from your account

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([-2.24, 53.48]);
}

function setupMap(center) {
  // creates the map, setting the container to the id of the div you added in step 2, and setting the initial center and zoom level of the map
  const map = new mapboxgl.Map({
    container: "map", // container ID
    center: center, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9, // starting zoom
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, "top-left");

  const directions = new MapboxDirections({
    accessToken: "YOUR_MAPBOX_ACCESS_TOKEN", // get your mapbox accessToken from your account
  });

  map.addControl(directions, "top-right");
}
