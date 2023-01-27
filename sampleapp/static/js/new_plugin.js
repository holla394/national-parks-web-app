// let map = L.map('map').setView([40.44695, -345.23437], 1);

// 		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
// 			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// 		}).addTo(map);

		// function onAccuratePositionError (e) {
		// 	addStatus(e.message, 'error');
		// }

		// function onAccuratePositionProgress (e) {
		// 	let message = 'Progressing … (Accuracy: ' + e.accuracy + ')';
		// 	addStatus(message, 'progressing');
		// }

		// function onAccuratePositionFound (e) {
		// 	let message = 'Most accurate position found (Accuracy: ' + e.accuracy + ')';
		// 	addStatus(message, 'done');
		// 	map.setView(e.latlng, 12);
		// 	L.marker(e.latlng).addTo(map);
		// }

		// function addStatus (message, className) {
		// 	let ul = document.getElementById('status'),
		// 		li = document.createElement('li');
		// 	li.appendChild(document.createTextNode(message));
		// 	ul.className = className;
		// 	ul.appendChild(li);
		// }

		// myMap.on('accuratepositionprogress', onAccuratePositionProgress);
		// myMap.on('accuratepositionfound', onAccuratePositionFound);
		// myMap.on('accuratepositionerror', onAccuratePositionError);

		// myMap.findAccuratePosition({
		// 	maxWait: 10000,
		// 	desiredAccuracy: 20
		// });