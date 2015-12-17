angular.module('ctcbigdataapp.controllers', [])

.controller('NoSQLDemoCtl', function($scope, $state, $ionicLoading, $stateParams, NoSQLService, ProfileService) {

	$scope.tracker = {};
	
	$scope.initTrackerPerson = function(obj) {
		console.log("initTrackerPerson");
		console.log(obj);
	}
	
	$scope.submitManualTrackerCallBack = function(tracker) {
		alert("You have submitted your activity tracking.\nThank you.");
		location.href = "#/tab/welcome";
	};
	
	$scope.submitManualTracker = function() { 

		console.log("Submit manual tracker");
		console.log($scope.tracker);
		NoSQLService.submitManualTracker($scope.tracker, $scope.submitManualTrackerCallBack);
	};
	
	$scope.viewMyActivities = function() {
		console.log("ViewMyActivities");
		$state.go('tab.nosqldemoactivitychart');
	}
	
	$scope.getMyProfileCallBack = function(profile) {
		if (profile.username == null) {
			$scope.tracker.person = "Please set your profile";
		} else {
			$scope.tracker.person = profile.username;	
		}
		console.log($scope.tracker.person);
	}
	ProfileService.getMyProfile($scope.getMyProfileCallBack);
	  
})


.controller('NoSQLDemoActivityChartCtl', function($scope, $state, $ionicLoading, $stateParams,  NoSQLService) {
	console.log("NoSQLDemoActivityChartCtl");
	
	$scope.constructChart2 = function() {
		$scope.chart2Object = {};
	    
	    $scope.chart2Object.type = "PieChart";
	    
	    $scope.chart2Object.data = {"cols": [
	        {id: "t", label: "Person", type: "string"},
	        {id: "s", label: "Percentage", type: "number"}
		    ], "rows": [
		        {c: [
		            {v: "Fernando Karnagi"},
		            {v: 30},
		        ]},
		        {c: [
		            {v: "Jacky Woo"},
		            {v: 39}
		        ]},
		        {c: [
		            {v: "Larry Lim"},
		            {v: 5},
		        ]}
		    ]};

	    $scope.chart2Object.options = {
	        'title': 'Activities Distribution / Individual'
	    };
	}
	
	$scope.constructChart3 = function() {
		$scope.chart3Object = {};
	    
	    $scope.chart3Object.type = "PieChart";
	    
	    $scope.chart3Object.data = {"cols": [
	        {id: "t", label: "Type", type: "string"},
	        {id: "s", label: "Percentage", type: "number"}
		    ], "rows": [
		        {c: [
		            {v: "Arrive at office"},
		            {v: 30},
		        ]},
		        {c: [
		            {v: "Check and reply email"},
		            {v: 39}
		        ]},
		        {c: [
		            {v: "Discussion with colleague"},
		            {v: 5},
		        ]},
		        {c: [
			            {v: "Business as usual"},
			            {v: 5},
			        ]}
		        ,
		        {c: [
		            {v: "Lunch break"},
		            {v: 5},
		        ]}
		        ,
		        {c: [
		            {v: "Tea break"},
		            {v: 5},
		        ]}
		        ,
		        {c: [
		            {v: "Toilet break"},
		            {v: 5},
		        ]}
		    ]};

	    $scope.chart3Object.options = {
	        'title': 'Activities Distribution / Type'
	    };
	}
	
	
	$scope.constructChart4 = function() {
		$scope.chart4Object = {};
	    
	    $scope.chart4Object.type = "PieChart";
	    
	    $scope.chart4Object.data = {"cols": [
	        {id: "t", label: "Type", type: "string"},
	        {id: "s", label: "Percentage", type: "number"}
		    ], "rows": [
		        {c: [
		            {v: "Arrive at office"},
		            {v: 80},
		        ]},
		        {c: [
		            {v: "Check and reply email"},
		            {v: 39}
		        ]},
		        {c: [
		            {v: "Discussion with colleague"},
		            {v: 5},
		        ]},
		        {c: [
			            {v: "Business as usual"},
			            {v: 5},
			        ]}
		        ,
		        {c: [
		            {v: "Lunch break"},
		            {v: 5},
		        ]}
		        ,
		        {c: [
		            {v: "Tea break"},
		            {v: 5},
		        ]}
		        ,
		        {c: [
		            {v: "Toilet break"},
		            {v: 5},
		        ]}
		    ]};

	    $scope.chart4Object.options = {
	        'title': 'Activities Distribution in Morning'
	    };
	}
	
	
	$scope.constructChart5 = function() {
		$scope.chart5Object = {};
	    
	    $scope.chart5Object.type = "PieChart";
	    
	    $scope.chart5Object.data = {"cols": [
	        {id: "t", label: "Type", type: "string"},
	        {id: "s", label: "Percentage", type: "number"}
		    ], "rows": [
		        {c: [
		            {v: "Arrive at office"},
		            {v: 7},
		        ]},
		        {c: [
		            {v: "Check and reply email"},
		            {v: 10}
		        ]},
		        {c: [
		            {v: "Discussion with colleague"},
		            {v: 59},
		        ]},
		        {c: [
			            {v: "Business as usual"},
			            {v: 5},
			        ]}
		        ,
		        {c: [
		            {v: "Lunch break"},
		            {v: 5},
		        ]}
		        ,
		        {c: [
		            {v: "Tea break"},
		            {v: 5},
		        ]}
		        ,
		        {c: [
		            {v: "Toilet break"},
		            {v: 5},
		        ]}
		    ]};

	    $scope.chart5Object.options = {
	        'title': 'Activities Distribution in Afternoon'
	    };
	}
	
	$scope.constructChart2();
	$scope.constructChart3();
	$scope.constructChart4();
	$scope.constructChart5();
})


.controller('WelcomeCtrl', function($scope, $stateParams) {
 
})

.controller('AboutUsCtl', function($scope, $stateParams) {
	
})

.controller('IOTDemoCtrl', function($scope, $state, $window, $stateParams, ProfileService, MQTT_HOST, MQTT_PORT, MQTT_USERNAME, MQTT_PASSWORD) {
	$scope.submitManualTrackerCallBack = function(tracker) {
		alert("You have submit your activity tracking.\nThank you.");
		location.href = "#/tab/welcome";
	};

	$scope.sendMqttTrackerWithLoop = function() {
		setTimeout(function () {   
		      if(autoLocationsSubmit) {    
		    	  
		    	  if (locationAcquired) {
		    		  i++;
		    		  if (i <= 9) {
		    			  $scope.noAlert = "Y";
		    		  } else {
		    			  $scope.noAlert = "N";
		    		  }
		    		  sendMqttWithGeoLocation($scope);
		    		  $scope.$apply();
		    	  } 
		    	  if (i > 10) {
		    		  i = 0; 
		    		  
		    		  alert("You have submitted 10 times.\nThank you");
		    		  return;
		    	  }
		    	  $scope.sendMqttTrackerWithLoop();   
		      }                        
		   }, 1000) 
	}
	
	$scope.activateAutoLocations = function() {
		console.log("activateAutoLocations, autoLocationsSubmit: " + autoLocationsSubmit);
				
		if (autoLocationsSubmit) {
			autoLocationsSubmit = false;
			//$scope.autoLocationsSubmitText = "Start";
			$scope.latLong = "";
		} else {
			autoLocationsSubmit = true;
			//$scope.autoLocationsSubmitText = "Stop";
			$scope.latLong = "Tracking your location...";
			$scope.sendMqttTrackerWithLoop();
		
		}
		
	}
	
	$scope.sendMqttMovementTrackerWithLoop = function() {
		setTimeout(function () {   
		      if(autoPositionsSubmit) {    
		    	  
		    	  if (positionAcquired) {
		    		  i++;
		    		  if (i <= 9) {
		    			  $scope.noAlert = "Y";
		    		  } else {
		    			  $scope.noAlert = "N";
		    		  }
		    		  sendMqttWithGeoPosition($scope);
		    		  $scope.$apply();
		    	  } 
		    	  if (i > 10) {
		    		  i = 0; 
		    		  
		    		  alert("You have submitted 10 times.\nThank you");
		    		  return;
		    	  }
		    	  $scope.sendMqttMovementTrackerWithLoop();   
		      }                        
		   }, 1000) 
	}
	
	$scope.activateAutoPositions = function() {
		console.log("activateAutoPositions, autoPositionsSubmit: " + autoPositionsSubmit);
				
		if (autoPositionsSubmit) {
			autoPositionsSubmit = false; 
			$scope.latLong = "";
		} else {
			autoPositionsSubmit = true;
			$scope.latLong = "Tracking your movement...";
			$scope.sendMqttMovementTrackerWithLoop();
		
		}
		
	}
	
	$scope.submitManualTracker = function() { 
		// Let us open a web socket
		// Create a client instance	
		
		if ($scope.tracker == null) {
			alert("Please provide your data");
			return;
		}
		
		sendMqttTracker($scope.tracker);
		
	};
	
	
	$scope.tracker = {};
	$scope.tracker.host = MQTT_HOST;
	$scope.tracker.port = MQTT_PORT;
	$scope.tracker.user = MQTT_USERNAME;
	$scope.tracker.password = MQTT_PASSWORD;
	
	$scope.tracker.lat = "calculating...";
	$scope.tracker.long = "calculating...";
	navigator.geolocation.getCurrentPosition(
      function(position) {
    	  $scope.tracker.lat = position.coords.latitude;
    	  $scope.tracker.long = position.coords.longitude;
    	 
      },
      function() {
          alert('Error getting 	location');
      });
	
	console.log(autoLocationsSubmit);
	if (autoLocationsSubmit) {
		//$scope.autoLocationsSubmitText = "Stop";
	} else {
		//$scope.autoLocationsSubmitText = "Start";
	}
	
	$scope.getMyProfileCallBack = function(profile) {
		if (profile.username == null) {
			$scope.tracker.person = "Please set your profile";
		} else {
			$scope.tracker.person = profile.username;	
		}
		console.log($scope.tracker.person);
	}
	ProfileService.getMyProfile($scope.getMyProfileCallBack);
	
})

.controller('MyProfileCtl', function($scope, $stateParams, ProfileService) {
	
	console.log("MyProfileCtl");
	$scope.profile = {};
	
	$scope.getMyProfileCallBack = function(profile) {
		$scope.profile = profile;
		console.log("Profile callback: " + profile)
	}
	
	$scope.updateYourProfile = function() {
		console.log("updateYourProfile");
		ProfileService.updateMyProfile($scope.profile, $scope.updateYourProfileCallBack);
	}
	$scope.updateYourProfileCallBack = function() {
		console.log("Update is successful");
		alert("Your profile has been updated", "Confirmation", "OK");
	}
	
	ProfileService.getMyProfile($scope.getMyProfileCallBack);
})

;
