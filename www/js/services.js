angular.module('ctcbigdataapp.services', [])

.factory('NoSQLService', function($http, NOSQL_SERVER_PATH, NOSQL_API_KEY, NOSQL_API_PASSWORD) {

  var roomsResult = {}; 
	
  return {
	  
    submitManualTracker: function(tracker, submitManualTrackerCallBack) {
		console.log("NoSQLService.submitManualTracker");
		console.log(tracker);
		
		// Define the string
	    var auth = btoa(NOSQL_API_KEY + ":" + NOSQL_API_PASSWORD);
		
	    var dt = new Date().getTime();
	   
	    tracker.when = dt;
	    tracker.table = "tracker";

	    var httpReq = 
    		$http({
    			method: 'POST',
    			url: NOSQL_SERVER_PATH,
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: tracker
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		
    		submitManualTrackerCallBack(tracker);
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
	
	},
	
	submitBulkTracker: function(submitBulkTrackerCallBack, tracker) {
		console.log("NoSQLService.submitManualTracker");
		console.log(tracker);
		
		// Define the string
	    var auth = btoa(NOSQL_API_KEY + ":" + NOSQL_API_PASSWORD);
		
	    var dt = new Date().getTime();
	   
	    tracker.when= dt;
	    tracker.table = "tracker";
	    

	    var httpReq = 
    		$http({
    			method: 'POST',
    			url: NOSQL_SERVER_PATH,
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: tracker
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		
    		submitBulkTrackerCallBack(tracker);
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
	
	},
	  
	getAllTrackerData: function(getAllTrackerDataCallBack) {
    	console.log("NoSQLService.getAllTrackerData");

		var bookingResult = {}; 
		
		// Define the string
	    var auth = btoa(NOSQL_API_KEY + ":" + NOSQL_API_PASSWORD);
		
	    var currentTimeStamp = new Date().getTime();
	   
	    var searchData = 

	    {
	      "selector": {
	        "table": "tracker"
	      },
	      "fields": [
	        "_id",
	        "_rev",
	        "person",
	        "when",
	        "activity",
	        "table",
	        "remarks"
	      ],
	      "sort": [
	        {
	          "when": "desc"
	        }
	      ]
	    };

    	var httpReq = 
    		$http({
    			method: 'POST',
    			url: NOSQL_SERVER_PATH + '/_find',
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: searchData
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		trackerResult = results.docs;
 
    		getAllTrackerDataCallBack(trackerResult);
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
    	
    	var ret = bookingResult;
    
    	return ret; 
    }
  };
})


.factory('ProfileService', function($http, $cordovaSQLite) {

  return {
	  
	getMyProfile: function(getMyProfileCallback) {
    	console.log("ProfileService.getMyProfile");

		var myProfile = {}; 
		
		if (window.cordova) {
			console.log("Getting from DB");
			var query = "select username, emailaddress, age from profile";
		      $cordovaSQLite.execute(db, query).then(function(res) {
		    	  console.log("rows: " + res.rows);
		    	  console.log("rows.length: " + res.rows.length);
		    	  if (res.rows != null && res.rows.length > 0) {
		    		  myProfile.username = res.rows.item(0).username;
		    		  myProfile.emailaddress = res.rows.item(0).emailaddress;
		    		  myProfile.age = res.rows.item(0).age;
		    		  getMyProfileCallback(myProfile);
		    	  }
		      }, function (err) {
		        console.error(err);
		    });
		} else {
			console.log("Getting from Cache");
			myProfile.username = "fernando.karnagi";
  		    myProfile.emailaddress = "fernando.karnagi@ctc-g.com.sg";
  		    myProfile.age = 36;
			getMyProfileCallback(myProfile);
		}
    },
    
    updateMyProfile: function(profile, updateMyProfileCallBack) {
    	console.log("ProfileService.updateMyProfile");
 
		if (window.cordova) {
			console.log("Getting from DB");
			console.log("profile " + profile);
			console.log("username " + profile.username);
			
			var query = "select username, emailaddress, age from profile";
		    $cordovaSQLite.execute(db, query).then(function(res) {
		    	  if (res.rows != null && res.rows.length > 0) {
		    		  var query = "update profile set username = ?, emailaddress = ?, age = ?";
				      $cordovaSQLite.execute(db, query, [profile.username, profile.emailaddress, profile.age]).then(function(res) {
				    	  console.log(res);
				    	  updateMyProfileCallBack();
				      }, function (err) {
				        console.error(err);
				    });
		    	  } else {
		    		  var query = "insert into profile(username, emailaddress, age) values(?, ?, ?)";
				      $cordovaSQLite.execute(db, query, [profile.username, profile.emailaddress, profile.age]).then(function(res) {
				    	  console.log(res);
				    	  updateMyProfileCallBack();
					      }, function (err) {
					        console.error(err);
					    });
		    	  }
		    }, function (err) {
		        console.error(err);
		    });
		      	
		} else {
			console.log("Getting from Cache");
			console.log("profile " + profile);
			console.log("username " + profile.username);
  		    updateMyProfileCallBack();
		}
    }
  };
})
  
	
.factory('SystemService', function($http, $cordovaSQLite) {

  return {
	  
	prepareDatabase: function() {
		if (window.cordova) {
	      console.log("Connecting to database and creating tables");
	      db = $cordovaSQLite.openDB("ctcbigdataapp");
	      var query = "CREATE TABLE IF NOT EXISTS profile (username text primary key, emailaddress text, age integer)";
	      $cordovaSQLite.execute(db, query).then(function(res) {
	          console.log("Table is created ", res);
	          
	      }, function (err) {
	          console.error(err); 
	      });
	      
		} 
    }
  };
})
;

var db;