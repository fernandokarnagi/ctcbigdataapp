var i = 0;

function sendMqttWithGeoLocation($scope) {
	navigator.geolocation.getCurrentPosition(
      function(position) {
    	  var tracker = {"person": "fernando.karnagi", "lat": position.coords.latitude, "long" : position.coords.longitude, "noAlert": $scope.noAlert};
    	  $scope.latLong = $scope.latLong + ",  [" + position.coords.latitude + ',' + position.coords.longitude + "]";
    	  //alert(position.coords.latitude + ',' + position.coords.longitude);
    	  sendMqttTracker(tracker);
    	  locationAcquired = true;
          
      },
      function() {
          alert('Error getting location');
      });
	locationAcquired = false;	
}

function sendMqttWithGeoPosition($scope) {
	navigator.accelerometer.getCurrentAcceleration(
      function(position) {
    	  var tracker = {"person": "fernando.karnagi", "x": position.x, "y" : position.y, 'z': position.z, "noAlert": $scope.noAlert};
    	  $scope.latLong = "Tracking your movement: [" + position.x + ',' + position.y + ',' + position.z + "]";
    	  sendMqttTracker(tracker);
    	  positionAcquired = true;
          
      },
      function() {
          alert('Error getting position');
      });
	positionAcquired = false;
}

function sendMqttTracker(tracker) {
	//var wsbroker = "10.12.195.246";  //mqtt websocket enabled brokers
	var wsbroker = tracker.host;  //mqtt websocket enabled brokers
    var wsport = tracker.port // port for above
    var clientId = "myclientid_" + parseInt(Math.random() * 100000);
    var client = new Paho.MQTT.Client(wsbroker, wsport, clientId);
    
	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	var options = {
            timeout: 60,
            useSSL: false,
            cleanSession: true,
            onSuccess: function(message) {
            	onConnect(message, client, tracker);
            },
            userName: tracker.user,
            password: tracker.password,
            onFailure: function (message) {
            	alert('error : ' + message);
            }
        };

	
	// connect the client
	client.connect(options);

	console.log("Submit manual tracker, clientId: " + clientId);
	
	console.log(tracker);
}

//called when the client connects
function onConnect(message, client, tracker) {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
	console.log(tracker);
	message = new Paho.MQTT.Message(tracker.person + "|" + tracker.lat + "|" + tracker.long); 
	message.destinationName = "CTC/Tracker"; 
	client.send(message); 
	console.log("send done");
	
	if (tracker.noAlert == null) {
		alert("You data has been submitted");
	}
		
}

//called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
	 console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}

//called when a message arrives
function onMessageArrived(message) {
	console.log("onMessageArrived:"+message.payloadString);
}

var autoLocationsSubmit = false;
var autoPositionsSubmit = false;
var positionAcquired = true;
var locationAcquired = true;