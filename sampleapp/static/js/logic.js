const base_url = window.location.href;
const parknames_url = `${base_url}/api/v1/allparknames`;
let parkname = "Yellowstone";
let yellowstone_coordinates = [44.423691, -110.588516];
let myMap = L.map("map", {
  center: yellowstone_coordinates,
  zoom: 6
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function optionChanged(selection) {
  displayborder(selection);
  // refreshTwitter(selection);
  // refreshArticles(selection);
};

function displayborder(parkname) {
  let geojson_api_url = `${base_url}api/v1/${parkname}`
  d3.json(geojson_api_url).then(data => {
    myMap.flyTo(new L.LatLng(data.features[0].geometry.coordinates[0][0][1],
      data.features[0].geometry.coordinates[0][0][0]),6);
    let plot_object = {
      "type":data.features[0].geometry.type,
      "coordinates":data.features[0].geometry.coordinates
    };
    L.geoJson(plot_object).addTo(myMap);
  })
};

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
};

loadpage(parkname);