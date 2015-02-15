// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'Controllers', 'firebase', 'auth0', 'angular-storage', 'angular-jwt'])

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {

 jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    // Return the saved token
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    // If no token return null
    if (!idToken || !refreshToken) {
      return null;
    }
    // If token is expired, get a new one
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  };

  $httpProvider.interceptors.push('jwtInterceptor');
 

  $stateProvider.state('/', {
    url: "/home",
    templateUrl: 'templates/main.html'
  })
  $stateProvider.state('javascript', {
    url: "/javascript",
    templateUrl: 'templates/javascript.html'
  })
  $stateProvider.state('angularjs', {
    url: "/angularjs",
    templateUrl: 'templates/angularjs.html',
    data: { 
      requiresLogin: true 
    }
  })
  $stateProvider.state('html5', {
    url: "/html5",
    templateUrl: 'templates/html5.html',
    data: { 
      requiresLogin: true 
    }
  })
  $stateProvider.state('python', {
    url: "/python",
    templateUrl: 'templates/python.html', 
    controller: 'PythonController',
    data: { 
      requiresLogin: true 
    }
  })
  $stateProvider.state('android', {
    url: "/android",
    templateUrl: 'templates/android.html', 
    data: { 
      requiresLogin: true 
    }
  })
  $stateProvider.state('success', {
    url: "/success",
    templateUrl: 'templates/success.html', 
    data: {
        requiresLogin: true
      }
  })
  $stateProvider.state('profile', {
    url: "/profile",
    templateUrl: 'templates/profile.html',
    data: { 
      requiresLogin: true 
    }
  })

  $urlRouterProvider.otherwise("/home")

  authProvider.init({
    domain: 'naderdabit.auth0.com',
    clientID: 'FtsX9Xg0IiryBfb001YzcT3J8f4u6jNx',
    // Here we add the URL to go if the user tries to access a resource he can't because he's not authenticated
    loginState: '/'
  });

})

.run(function($ionicPlatform, auth, $rootScope, store, jwtHelper, $location, $state) {

  auth.hookEvents();

  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
         }
        // else {
        //   $state.go('/')
        // }
      } 
      // else { $state.go('/') }
    } 
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
