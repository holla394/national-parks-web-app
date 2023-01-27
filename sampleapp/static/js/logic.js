const base_url = window.location.href;
const parknames_url = `${base_url}/api/v1/allparknames`;
const statenames_url = `${base_url}/api/v1/states`;

let parkname = "aaaYellowstone";
let yellowstone_coordinates = [39.50, -98.35];

let myMap = L.map("map", {
    center: yellowstone_coordinates,
    zoom: 5
});

let plot_object;
let myMapLayer;

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function optionChanged(selection) {
    displayborder(selection);
    // refreshTwitter(selection);
    // refreshArticles(selection);
};

function generateZoom(area, parkname) {
    
    // onEachFeature: function(layer) {
    //     // Set the mouse events to change the map styling.
    //     layer.on({
    //         click: function(event) {
    //             myMap.fitBounds(event.target.getBounds());
    //         }
    //     })
    // }
    let geojson_api_url = `${base_url}api/v1/${parkname}`
    d3.json(geojson_api_url).then(data => {
        return myMap.fitBounds(data.getBounds());
    });

    // area is less than 50k
    if(area < 50000.00){
        return 8;
    }
    // area is less than 100k
    else if(area < 100000.00){
        return 8;
    }
    // area is less than 1 million
    else if(area < 1000000.00){
        return 8;
    }
    // area is less than 5 million
    else if(area < 5000000.00){
        return 8;
    }
    // area is less than 10 million
    else if(area < 10000000.00){
        return 8;
    }
    // area is less than 100 million
    else if(area < 100000000.00) {
        return 8;
    }
    // greater than or equal to 100 million
    else {
        return 8;
    }
};

function displayborder(parkname) {
    if (myMapLayer) {
        myMap.removeLayer(myMapLayer);
    }
    
    omit_state = parkname.slice(3)
    let geojson_api_url = `${base_url}api/v1/${omit_state}`
    d3.json(geojson_api_url).then(data => {

        if(data.features[0].geometry.type == "Polygon") {
            myMap.panTo(new L.LatLng(
                data.features[0].geometry.coordinates[0][0][1],
                data.features[0].geometry.coordinates[0][0][0]),
                10, {duration:6,animte:true}
                //{duration: 2,easeLinearity: 1}// options:{animate:true}
                //generateZoom(data.features[0].area, omit_state)
            );
            // myMap.fitBounds(data.features[0].geometry.coordinates.getSouthWest(), data.features[0].geometry.coordinates.getNorthEast());
            // myMap.panInside(new L.LatLng(
            //     data.features[0].geometry.coordinates[0][0][0][1],
            //     data.features[0].geometry.coordinates[0][0][0][0])//,
            //     [0, 0]
            // );
        }

        else if (data.features[0].geometry.type == "MultiPolygon") {
            myMap.panTo(new L.LatLng(
                data.features[0].geometry.coordinates[0][0][0][1],
                data.features[0].geometry.coordinates[0][0][0][0]),
                10, {duration:6,animte:true}
                // {duration: 2,easeLinearity: 1}
                //generateZoom(data.features[0].area, omit_state)
            );
            // myMap.fitBounds(data.features[0].geometry.coordinates.getSouthWest(), data.features[0].geometry.coordinates.getNorthEast());
            // myMap.panInside(new L.LatLng(
            //     data.features[0].geometry.coordinates[0][0][0][1],
            //     data.features[0].geometry.coordinates[0][0][0][0])//,
            //     [0, 0]
            // );
        }

        // myMap.fitBounds(data.features[0].geometry.coordinates.getSouthWest(), data.features[0].geometry.coordinates.getNorthEast());

        plot_object = {
            "type":data.features[0].geometry.type,
            "coordinates":data.features[0].geometry.coordinates
        }
        //console.log(plot_object.getBounds());

        myMapLayer = L.geoJson(plot_object);
        myMapLayer.addTo(myMap);
        myMap.fitBounds(myMapLayer.getBounds());

    });
};

function loadpage(parkname) {
    d3.json(parknames_url).then(names => {

        names.forEach( (name) => {
            let drop_down = d3.select("#selDataset");
            drop_down.append("option").text(name);
        });

    });

    displayborder(parkname);
};

loadpage(parkname);