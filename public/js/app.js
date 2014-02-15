'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    when('/beer', {
      templateUrl : 'expose/beer/list',
      controller : 'BeerListController'
    }).
    when('/beer/create', {
      templateUrl : 'expose/beer/create',
      controller : 'BeerCreateController'
    }).
    when('/beer/:id', {
      templateUrl : 'expose/beer/show',
      controller : 'BeerShowController'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});
