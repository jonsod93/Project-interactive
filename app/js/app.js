var movieDatabaseApp = angular.module('movieDatabase', ['ngRoute','ngResource','ngCookies']);

movieDatabaseApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/movie/:id', {
        templateUrl: 'partials/movie.html',
        controller: 'MovieCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);