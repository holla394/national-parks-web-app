# National Parks Web App

Goal: To create an easy to use visual representation of the National Parks and Historic Sites in the US

## Description

Our National Parks Web App loads with an accurate user location marker. The user is then able to choose from a dropdown menu of 400+ National Parks and sites sorted by state. A zoom function takes the user from park to park, outlining park boundaries and displays additional information on the park below (including park name, state, region, area, and url) and twitter data if there is an official twitter handle for the park. 

### Sources

* Data was retrieved from the National Park Service via https://public-nps.opendata.arcgis.com

## Built With

* Mapping: Leaflet
* User Location Marker: Leaflet.AccuratePosition

## Process

* Housed data in MongoDB

* Used PyMongo with Render

* Created dropdown with state and parkname selection

* Created map using Leaflet that zooms to park boundaries based upon park selection

* Added user location using Leaflet accurate position for initial site load

* Populated Twitter data for park selection

* Populated metadata for park selection

## Authors

Sam Holland
Paul Brichta
Lindsey Wolterstorff
