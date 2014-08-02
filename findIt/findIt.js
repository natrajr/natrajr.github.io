
var map;
var myMarker;
var myLat=0;
var myLong=0;
var myLoc;

function initMap() {
	var mapOptions = {
  		center: myLoc,
  		zoom: 13,
  		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map =new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);	
	getLocation();
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat=position.coords.latitude;
			myLong=position.coords.longitude;
			myLoc=new google.maps.LatLng(myLat, myLong);
			//renderMarker();
		});
	}
	else {
		alert("Your Browser Does not Support Geolocation");
	}

}