angular
  .module('app', [ //define module and include dependencies
    'ui.router', //for routing
    //'templates', //include templates folder
    'ngResource' //allow use of $resource
    //'ui.bootstrap', //NOT WORKING
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', { //create a ui-router state
        url: '/', //set url route
        templateUrl: 'home.html', //set template url
        controller: 'HomeController as ctrl' //set controller for this route (equavelent of using <ng-controller="..."> in template)
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'AuthController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'AuthController'
      })
      .state('artist', {
        url: '/artists/:id',
        templateUrl: 'artists/show.html',
        controller: 'ArtistController as ctrl'
      })
      .state('editArtist', {
        url: '/artists/:id/edit',
        templateUrl: 'artists/edit.html',
        controller: 'EditArtistController as ctrl'
      })
      .state('newSketch', {
        url: '/sketches/new',
        templateUrl: 'sketches/new.html',
        controller: 'NewSketchController as ctrl'
      })
      .state('sketch', {
        url: '/sketches/:id',
        templateUrl: 'sketches/show.html',
        controller: 'SketchController as ctrl'
      })
      .state('editSketch', {
        url: '/sketches/:id/edit',
        templateUrl: 'sketches/edit.html',
        controller: 'EditSketchController as ctrl'
      });

    $urlRouterProvider.otherwise('/'); //default route
});

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
