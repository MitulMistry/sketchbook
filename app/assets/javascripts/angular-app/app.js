var app = angular.module('app', ['ui.router']); //'ui.bootstrap' not working

// app.config(function($stateProvider, $urlRouterProvider){
//   $stateProvider
//     .state('home', {
//       url: '/',
//       templateUrl: 'home.html',
//       controller: 'HomeController as ctrl'
//     });
//
//     $urlRouterProvider.otherwise('/'); //default route
// });

// routes:
// -Not logged in:
// 	-login
// 	-register
// -Others:
// 	-home page - show all sketches - filter by tags
// 	-user show pages - profile + sketches
// 		-Your profile
// 	-user forms:
// 		-edit profile
// 	-sketch show pages
// 	-sketch forms:
// 		-new
// 		-edit + delete?
