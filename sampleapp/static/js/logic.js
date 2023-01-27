const base_url = window.location.href;
const parknames_url = `${base_url}api/v1/allparknames`;
const delay = ms => new Promise(res => setTimeout(res, ms));

let parkname = "AK,Alagnak";
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
    refreshTwitter(selection);
    // refreshArticles(selection);
};

function refreshTwitter(selection) {
    omit_state = selection.slice(3)
  let url = base_url + `api/v1/gettweets/${omit_state}`
  d3.json(url).then( tweets => {
    if(tweets) {
        twitter_box = d3.select("#tweets");
        twitter_box.selectAll("h5").remove();
      tweets.forEach(tweet => {
        // twitter_box = d3.select("#tweets"); was here, moving up above
        twitter_box.append("h5").text(tweet);
      });
    };
  });
};

function generateZoom(area) {
    // console.log(area)
    // 50k
    if(area < 50000.00){
        return 30;
    }
    // 100k
    else if(area < 100000.00){
        return 26;
    }
    // 1 million
    else if(area < 1000000.00){
        return 21;
    }
    // 5 million
    else if(area < 5000000.00){
        return 17;
    }
    // 10 million
    else if(area < 10000000.00){
        return 12;
    }
    // 100 million
    else if(area < 100000000.00) {
        return 8;
    }
    else {
        return 6;
    };
};

async function fitBoundary() {
    await delay(3000);
    myMap.fitBounds(myMapLayer.getBounds());
}

async function displayborder(parkname) {
    if (myMapLayer) {
        myMap.removeLayer(myMapLayer);
    }
    
    omit_state = parkname.slice(3)
    let geojson_api_url = `${base_url}api/v1/${omit_state}`
    console.log(geojson_api_url);
    d3.json(geojson_api_url).then(data => {

        if(data.features[0].geometry.type == "Polygon") {
            myMap.flyTo(new L.LatLng(
                data.features[0].geometry.coordinates[0][0][1],
                data.features[0].geometry.coordinates[0][0][0]),
            );
        }

        else if (data.features[0].geometry.type == "MultiPolygon") {
            myMap.flyTo(new L.LatLng(
                data.features[0].geometry.coordinates[0][0][0][1],
                data.features[0].geometry.coordinates[0][0][0][0]),
            );
        }

        plot_object = {
            "type":data.features[0].geometry.type,
            "coordinates":data.features[0].geometry.coordinates
        }

        myMapLayer = L.geoJson(plot_object);
        myMapLayer.addTo(myMap);
        fitBoundary();

    });
};

function loadpage(parkname) {
    d3.json(parknames_url).then(names => {

        names.forEach( (name) => {
            let drop_down = d3.select("#selDataset");
            drop_down.append("option").text(name);
        });

    });

    // displayborder(parkname);
    myMap.on('accuratepositionprogress', onAccuratePositionProgress);
    myMap.on('accuratepositionfound', onAccuratePositionFound);
    myMap.on('accuratepositionerror', onAccuratePositionError);

    myMap.findAccuratePosition({
        maxWait: 10000,
        desiredAccuracy: 20
    });
};



function onAccuratePositionError (e) {
    addStatus(e.message, 'error');
}

function onAccuratePositionProgress (e) {
    let message = 'Progressing … (Accuracy: ' + e.accuracy + ')';
    addStatus(message, 'progressing');
}

function onAccuratePositionFound (e) {
    let message = 'Most accurate position found (Accuracy: ' + e.accuracy + ')';
    addStatus(message, 'done');
    myMap.setView(e.latlng, 12);
    L.marker(e.latlng).addTo(myMap);
}

function addStatus (message, className) {
    let ul = document.getElementById('status'),
        li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    ul.className = className;
    ul.appendChild(li);
}

loadpage(parkname);