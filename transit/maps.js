

var stations=[{"Line":"Blue","Station":"Airport","stop_lat":42.374262,"stop_lon":-71.030395},
{"Line":"Blue","Station":"Aquarium","stop_lat":42.359784,"stop_lon":-71.051652},
{"Line":"Blue","Station":"Beachmont","stop_lat":42.39754234,"stop_lon":-70.99231944},
{"Line":"Blue","Station":"Bowdoin","stop_lat":42.361365,"stop_lon":-71.062037},
{"Line":"Blue","Station":"Government Center","stop_lat":42.359705,"stop_lon":-71.059215},
{"Line":"Blue","Station":"Maverick","stop_lat":42.36911856,"stop_lon":-71.03952958},
{"Line":"Blue","Station":"Orient Heights","stop_lat":42.386867,"stop_lon":-71.004736},
{"Line":"Blue","Station":"Revere Beach","stop_lat":42.40784254,"stop_lon":-70.99253321},
{"Line":"Blue","Station":"State Street","stop_lat":42.358978,"stop_lon":-71.057598},
{"Line":"Blue","Station":"Suffolk Downs","stop_lat":42.39050067,"stop_lon":-70.99712259},
{"Line":"Blue","Station":"Wonderland","stop_lat":42.41342,"stop_lon":-70.991648},
{"Line":"Blue","Station":"Wood Island","stop_lat":42.3796403,"stop_lon":-71.02286539},
{"Line":"Orange","Station":"Back Bay","stop_lat":42.34735,"stop_lon":-71.075727},
{"Line":"Orange","Station":"Chinatown","stop_lat":42.352547,"stop_lon":-71.062752},
{"Line":"Orange","Station":"Community College","stop_lat":42.373622,"stop_lon":-71.069533},
{"Line":"Orange","Station":"Downtown Crossing","stop_lat":42.355518,"stop_lon":-71.060225},
{"Line":"Orange","Station":"Forest Hills","stop_lat":42.300523,"stop_lon":-71.113686},
{"Line":"Orange","Station":"Green Street","stop_lat":42.310525,"stop_lon":-71.107414},
{"Line":"Orange","Station":"Haymarket","stop_lat":42.363021,"stop_lon":-71.05829},
{"Line":"Orange","Station":"Jackson Square","stop_lat":42.323132,"stop_lon":-71.099592},
{"Line":"Orange","Station":"Malden Center","stop_lat":42.426632,"stop_lon":-71.07411},
{"Line":"Orange","Station":"Mass Ave","stop_lat":42.341512,"stop_lon":-71.083423},
{"Line":"Orange","Station":"North Station","stop_lat":42.365577,"stop_lon":-71.06129},
{"Line":"Orange","Station":"Oak Grove","stop_lat":42.43668,"stop_lon":-71.071097},
{"Line":"Orange","Station":"Roxbury Crossing","stop_lat":42.331397,"stop_lon":-71.095451},
{"Line":"Orange","Station":"Ruggles","stop_lat":42.336377,"stop_lon":-71.088961},
{"Line":"Orange","Station":"State Street","stop_lat":42.358978,"stop_lon":-71.057598},
{"Line":"Orange","Station":"Stony Brook","stop_lat":42.317062,"stop_lon":-71.104248},
{"Line":"Orange","Station":"Sullivan","stop_lat":42.383975,"stop_lon":-71.076994},
{"Line":"Orange","Station":"Tufts Medical","stop_lat":42.349662,"stop_lon":-71.063917},
{"Line":"Orange","Station":"Wellington","stop_lat":42.40237,"stop_lon":-71.077082},
{"Line":"Red","Station":"Alewife","stop_lat":42.395428,"stop_lon":-71.142483},
{"Line":"Red","Station":"Andrew","stop_lat":42.330154,"stop_lon":-71.057655},
{"Line":"Red","Station":"Ashmont","stop_lat":42.284652,"stop_lon":-71.064489},
{"Line":"Red","Station":"Braintree","stop_lat":42.2078543,"stop_lon":-71.0011385},
{"Line":"Red","Station":"Broadway","stop_lat":42.342622,"stop_lon":-71.056967},
{"Line":"Red","Station":"Central Square","stop_lat":42.365486,"stop_lon":-71.103802},
{"Line":"Red","Station":"Charles/MGH","stop_lat":42.361166,"stop_lon":-71.070628},
{"Line":"Red","Station":"Davis","stop_lat":42.39674,"stop_lon":-71.121815},
{"Line":"Red","Station":"Downtown Crossing","stop_lat":42.355518,"stop_lon":-71.060225},
{"Line":"Red","Station":"Fields Corner","stop_lat":42.300093,"stop_lon":-71.061667},
{"Line":"Red","Station":"Harvard Square","stop_lat":42.373362,"stop_lon":-71.118956},
{"Line":"Red","Station":"JFK/UMass","stop_lat":42.320685,"stop_lon":-71.052391},
{"Line":"Red","Station":"Kendall/MIT","stop_lat":42.36249079,"stop_lon":-71.08617653},
{"Line":"Red","Station":"North Quincy","stop_lat":42.275275,"stop_lon":-71.029583},
{"Line":"Red","Station":"Park Street","stop_lat":42.35639457,"stop_lon":-71.0624242},
{"Line":"Red","Station":"Porter Square","stop_lat":42.3884,"stop_lon":-71.119149},
{"Line":"Red","Station":"Quincy Adams","stop_lat":42.233391,"stop_lon":-71.007153},
{"Line":"Red","Station":"Quincy Center","stop_lat":42.251809,"stop_lon":-71.005409},
{"Line":"Red","Station":"Savin Hill","stop_lat":42.31129,"stop_lon":-71.053331},
{"Line":"Red","Station":"Shawmut","stop_lat":42.29312583,"stop_lon":-71.06573796},
{"Line":"Red","Station":"South Station","stop_lat":42.352271,"stop_lon":-71.055242},
{"Line":"Red","Station":"Wollaston","stop_lat":42.2665139,"stop_lon":-71.0203369}
]



var theMap;
var Mymarker;

var myLng=0;
var myLat=0;
var myLoc;
var infoWindow;
var mbtaData={};
var xhr;
var lineArray;

function init_map() {

	var mapOptions = {
  		center: myLoc,
  		zoom: 13,
  		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	theMap =new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	getMyLocation();
}

function getMyLocation() 
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat=position.coords.latitude;
			myLng=position.coords.longitude;
			myLoc= new google.maps.LatLng(myLat, myLng);
			renderMap();
		});
	}
	else {
		alert("Your Browser Does Not Support Geolocation");
	}
}

function renderMap() {
	myLoc=new google.maps.LatLng(myLat,myLng);
	theMap.panTo(myLoc);
	
	Mymarker=new google.maps.Marker({
		position: myLoc,
		map: theMap,
		title: "Click the Marker to See the Closest T Station"
	});
	
	infoWindow=new google.maps.InfoWindow();
	infoWindow.open(theMap, Mymarker);
	infoWindow.setContent("Click The Marker");
	init_data();

}
function init_data() {
	xhr= new XMLHttpRequest();
	xhr.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	xhr.send(null);
	xhr.onreadystatechange= callback; 
}
function callback() {
	if (xhr.readyState==4 && xhr.status==200) {
		mbtaData=JSON.parse(xhr.responseText);
		whichLine();
	}
	else if (xhr.readyState==4 && xhr.status==500) {
		alert("Error Retrieving MBTA Data");
	}
}

function getDistance(lat1, lng1, lat2, lng2) {
	Number.prototype.toRad = function() 
	{
		return this * Math.PI / 180;
	}

	var rad = 6371;
	var x1 = lat2-lat1;
	var dLat = x1.toRad();

	var x2 = lng2-lng1;

	var dLng = x2.toRad();

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
   	Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
   	Math.sin(dLng/2) * Math.sin(dLng/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

    var d = radius * c;

    return d;
}

function whichLine() {
	var lineType=mbtaData.line;

	switch(lineType) {
		case "red":
			redLine();
			break;
		case "orange":
			orangeLine();
			break;
		case "blue":
			blueLine();
			break;
		default:
			alert("Error Retrieing MBTA data");


	}
}



function redLine() {
	var redCoords=[];
	for (i=0; i<stations.length; i++) {
		if (stations[i].Line=="Red") {
			var stop_pos=new google.maps.LatLng(stations[i].stop_lat, stations[i].stop_lon);
			redCoords[i]=stop_pos;
		}
	}
	lineArray=redCoords;
	var stationLines = new google.maps.Polyline({
    	path: redCoords,
    	strokeColor: "#FF0000",
    	strokeOpacity: 0.7,
    	strokeWeight: 5
  		});
  		stationLines.setMap(theMap);
}
function blueLine() {
	var blueCoords=[];
	for (i=0; i<stations.length; i++) {
			if (stations[i].Line=="Blue") {
				var stop_pos=new google.maps.LatLng(stations[i].stop_lat, stations[i].stop_lon);
				blueCoords[i]=stop_pos;
				}
			}
		lineArray=blueCoords;
		var stationLines = new google.maps.Polyline({
    	path: blueCoords,
    	strokeColor: "#0000FF",
    	strokeOpacity: 0.7,
    	strokeWeight: 5
		});
		stationLines.setMap(theMap);
}
function orangeLine() {
		var orangeCoords=[];
	for (i=0; i<stations.length; i++) {
		if (stations[i].Line=="Orange") {
			var stop_pos=new google.maps.LatLng(stations[i].stop_lat, stations[i].stop_lon);
			orangeCoords[i]=stop_pos;
		}
	}
	lineArray=orangeCoords;
		var stationLines = new google.maps.Polyline({
    	path: orangeCoords,
    	strokeColor: "#0000FF",
    	strokeOpacity: 0.7,
    	strokeWeight: 5
		});

		stationLines.setMap(theMap);
}



//function closestStation() {}