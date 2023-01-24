// Creating the map object
let myMap = L.map("map", {
  center: [39.50, -98.35],
  zoom: 6
});

let base_url = window.location.href;

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
// const link = "https://nationalparksgeojson01192023.s3.us-east-2.amazonaws.com/NPS_-_Land_Resources_Division_Boundary_and_Tract_Data_Service.geojson";

// Getting our GeoJSON data
// const successCb = (resp) => {
//     console.log(resp);
// 	L.geoJSON(resp).addTo(myMap);
// };

// const errorCb = (err) => {
//     console.error('Error - ', err);
// };

function optionChanged(selection) {
  displayborder(selection);
  // refreshTwitter(selection);
  // refreshArticles(selection);
};

function displayborder(parkname) {
  let geojson_api_url = `${base_url}/api/v1/${parkname}`
  d3.json(geojson_api_url).then(data => {
    L.geoJson(data.features[0].geometry.coordinates).addTo(myMap)
  })
};

names = `${base_url}/api/v1/allparknames`;

let parkname = "Yellowstone National Park";

function loadpage(parkname) {
  let parknames_url = `${base_url}/api/v1/allparknames`;
  d3.json(parknames_url).then(names => {
    names.forEach( (name) =>
        {
          let drop_down = d3.select("#selDataset");
          drop_down.append("option").text(name);
        });
  });
  displayborder(parkname);
  // refreshTwitter(selection);
  // refreshArticles(selection);
};

// function downloadObject(link, successCb, errorCb) {
//     fetch(link)
//       .then(response => response.json())
//       .then(successCb)
//       .catch(errorCb);
// };

// downloadObject(link, successCb, errorCb);

loadpage(parkname);