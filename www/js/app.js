// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ctcbigdataapp', ['ionic', 'ctcbigdataapp.controllers', 'ctcbigdataapp.services', 'ctcbigdataapp.config', 'googlechart', 'ngCordova'])

.run(function($ionicPlatform, SystemService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    SystemService.prepareDatabase();
    
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  
  .state('tab.welcome', {
    url: '/welcome',
    views: {
      'tab-welcome': {
        templateUrl: 'templates/tab-welcome.html',
        controller: 'WelcomeCtrl'
      }
    }
  })
  

  .state('tab.aboutus', {
    url: '/aboutus',
    views: {
      'tab-aboutus': {
        templateUrl: 'templates/tab-aboutus.html',
        controller: 'AboutUsCtl'
      }
    }
  })
 
  // Each tab has its own nav history stack;
  .state('tab.iotdemo', {
    url: '/iotdemo',
    views: {
      'tab-iotdemo': {
        templateUrl: 'templates/tab-iotdemo.html',
        controller: 'IOTDemoCtrl'
      }
    }
  })
 
  .state('tab.hadoopdemo', {
    url: '/hadoopdemo',
    views: {
      'tab-hadoopdemo': {
        templateUrl: 'templates/tab-hadoopdemo.html',
        controller: 'HadoopDemoCtl'
      }
    }
  })
 
  .state('tab.nosqldemo', {
    url: '/nosqldemo',
    views: {
      'tab-nosqldemo': {
        templateUrl: 'templates/tab-nosqldemo.html',
        controller: 'NoSQLDemoCtl'
      }
    }
  })
 
  .state('tab.nosqldemoactivitychart', {
    url: '/nosqldemoactivitychart',
    views: {
      'tab-nosqldemo': {
        templateUrl: 'templates/tab-nosqldemoactivitychart.html',
        controller: 'NoSQLDemoActivityChartCtl'
      }
    }
  })
  
   .state('tab.myprofile', {
    url: '/myprofile',
    views: {
      'tab-myprofile': {
        templateUrl: 'templates/tab-myprofile.html',
        controller: 'MyProfileCtl'
      }
    }
  })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/welcome');

});
