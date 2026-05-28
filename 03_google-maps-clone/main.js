// sets the access token, associating the map with your Mapbox account and its permissions
mapboxgl.accessToken = "your_access_token"; // get it from your mapbox account

// creates the map, setting the container to the id of the div you added in step 2, and setting the initial center and zoom level of the map
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});
