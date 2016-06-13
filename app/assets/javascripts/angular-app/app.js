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
        controller: 'AuthController'
      })
      .state('home.register', {
        url: 'register',
        templateUrl: 'auth/register.html',
        controller: 'AuthController'
      })
      .state('home.artist', {
        url: 'artists/:id',
        templateUrl: 'artists/show.html',
        controller: 'ArtistController as ctrl'
      })
      .state('home.editArtist', {
        url: 'artists/:id/edit',
        templateUrl: 'artists/edit.html',
        controller: 'EditArtistController as ctrl'
      })
      .state('home.newSketch', {
        url: 'sketches/new',
        templateUrl: 'sketches/new.html',
        controller: 'NewSketchController as ctrl'
      })
      .state('home.sketches', {
        url: 'sketches',
        templateUrl: 'sketches/index.html',
        controller: 'SketchesController as ctrl'
      })
      .state('home.sketch', {
        url: 'sketches/:id',
        templateUrl: 'sketches/show.html',
        controller: 'SketchController as ctrl'
      })
      .state('home.editSketch', {
        url: 'sketches/:id/edit',
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
