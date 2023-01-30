# National Parks Web Application

Goal: To create an easy to use visual representation of the National Parks and Historic Sites in the US

## Description

Our National Parks Web Application initially loads the web page with an accurate user location marker using the Leaflet JavaScript Plugin Accurate Location. The user is then able to choose from a dropdown menu of 400+ National Parks and sites sorted by state alphabetically. The web page takes the user from park to park outlining the selected park's boundaries as well as displaying additional information about the park below. The metadata for the national parks include the park name, state, region, area, and a url to the park's National Park Service webpage. Twitter data is also pulled for the park and displayed below if there is an official twitter handle for the park.

### Sources

* Data was retrieved from the National Park Service via https://public-nps.opendata.arcgis.com

## Built With


* Data was stored in a Mongo Database
* Flask-PyMongo was used to pull data using an API from the database
* Mapping: Leaflet
* Functions were used define to change dropdown menu options, refresh Twitter data, outline the map boundaries including zoom, pan, and fit boundaries
* User Location Marker: Leaflet.AccuratePosition

## Process

* Housed data in MongoDB
![Screenshot (24)](https://user-images.githubusercontent.com/113874979/215343549-7f30f6c0-aa25-4b94-b660-3e9dc5c866cf.png)

* Used PyMongo with Render to host the web app
![Screenshot (22)](https://user-images.githubusercontent.com/113874979/215343171-cc045a0f-c23d-4d55-808f-6dcc17fd818a.png)

* Created dropdown with state and parkname selection

* Created map using Leaflet that zooms to park boundaries based upon park selection

* Added user location using Leaflet accurate position for initial site load

* Populated Twitter data for park selection

* Populated metadata for park selection

## Authors

Sam Holland
Paul Brichta
Lindsey Wolterstorff
