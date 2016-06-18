angular
  .module('app', [ //define module and include dependencies
    'ui.router', //for routing
    'templates', //use angular-rails-templates gem to include html templates in the Rails asset pipeline for Angular
    'ngResource', //allow use of $resource
    'ui.bootstrap', //angular ui bootstrap - bootstrap components written in angular
    'Devise', //angular-devise to communicate with rails devise for authentication
    'ngMessages', //directive to show/hide messages
    'ngFlash' //flash message for AngularJS and Bootstrap
    //'ngFileUpload' //angular directive to upload files
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', { //create a ui-router state
        url: '/', //set url route
        templateUrl: 'home.html', //set template url
        controller: 'HomeController as ctrl' //set controller for this route (equavelent of using <ng-controller="..."> in template)
      })
      .state('home.login', { //home.login uses home.html and inserts login template into the <ui-view>
        url: 'login',
        templateUrl: 'auth/login.html',
        controller: 'AuthController',
        onEnter: function($state, Auth) {
          if (Auth._currentUser) { //if already logged in, redirect - uses angular devise
            Auth.currentUser().then(function (){
              $state.go('home.sketches');
            });
          }
        }
      })
      .state('home.register', {
        url: 'register',
        templateUrl: 'auth/register.html',
        controller: 'AuthController',
        onEnter: function($state, Auth) {
          if (Auth._currentUser) { //if already logged in, redirect
            Auth.currentUser().then(function (){
              $state.go('home.sketches');
            });
          }
        }
      })
      .state('home.artists', {
        url: 'artists',
        templateUrl: 'artists/index.html',
        controller: 'ArtistsController as ctrl',
        resolve: { //execute this code before the template is rendered
          artists: function (ArtistsService) { //set artists equal to ArtistsService.getArtists() to be used in the template
            return ArtistsService.getArtists();
          }
        }
      })
      .state('home.artist', {
        url: 'artists/:id',
        templateUrl: 'artists/show.html',
        controller: 'ArtistController as ctrl',
        resolve: { //execute this code before the template is rendered
          artist: function ($stateParams, ArtistsService) {
            return ArtistsService.getArtist($stateParams.id); //load individual artist
          },
          user: function (Auth) {
            return Auth.currentUser();
          }
        }
      })
      .state('home.editArtist', {
        url: 'artists/:id/edit',
        templateUrl: 'artists/edit.html',
        controller: 'EditArtistController as ctrl',
        resolve: { //execute this code before the template is rendered
          artist: function ($stateParams, ArtistsService) {
            return ArtistsService.getArtist($stateParams.id); //load individual artist
          }
        },
        onEnter: function($state, Auth) {
          if (!Auth._currentUser) { //NEED TO CHECK IF CURRENT USER IS ARIST
            $state.go('home');
          }
        }
      })
      .state('home.newSketch', {
        url: 'sketches/new',
        templateUrl: 'sketches/new.html',
        controller: 'NewSketchController as ctrl',
        onEnter: function($state, Auth) {
          if (!Auth._currentUser) { //if not logged in, redirect
            $state.go('home');
          }
        }
      })
      .state('home.sketches', {
        url: 'sketches',
        templateUrl: 'sketches/index.html',
        controller: 'SketchesController as ctrl',
        resolve: { //execute this code before the template is rendered
          sketches: function (SketchesService) { //set sketches equal to SketchesService.getSketches() to be used in the template
            return SketchesService.getSketches();
          }
        }
      })
      .state('home.sketch', {
        url: 'sketches/:id',
        templateUrl: 'sketches/show.html',
        controller: 'SketchController as ctrl',
        resolve: { //execute this code before the template is rendered
          sketch: function ($stateParams, SketchesService) {
            return SketchesService.getSketch($stateParams.id); //load individual sketch
          }
        }
      })
      .state('home.editSketch', {
        url: 'sketches/:id/edit',
        templateUrl: 'sketches/edit.html',
        controller: 'EditSketchController as ctrl',
        resolve: { //execute this code before the template is rendered
          sketch: function ($stateParams, SketchesService) {
            return SketchesService.getSketch($stateParams.id); //load individual sketch
          }
        },
        onEnter: function($state, Auth) {
          if (!Auth._currentUser) { //NEED TO CHECK IF USER OWN'S SKETCH
            $state.go('home');
          }
        }
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
