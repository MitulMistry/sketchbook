angular
  .module('app', [ //define module and include dependencies
    'ui.router', //for routing
    'templates', //use angular-rails-templates gem to include html templates in the Rails asset pipeline for Angular
    //'ngResource', //allow use of $resource
    'ui.bootstrap', //angular ui bootstrap - bootstrap components written in angular
    'Devise', //angular-devise to communicate with rails devise for authentication
    'ngMessages', //directive to show/hide messages
    'ngFlash', //flash message for AngularJS and Bootstrap
    'ngFileUpload', //angular directive to upload files
    'checklist-model', //angular checklist-model for checkbox arrays for forms
    'angularUtils.directives.dirPagination', //angular-utils-paginations
    'sticky-footer' //angular-sticky-footer directive to keep footer at bottom of page
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
          sketches: function($stateParams, ArtistsService) {
            return ArtistsService.getArtistSketches($stateParams.id); //load the sketches of the artist
          },
          user: function (Auth) {
            return Auth._currentUser;
          }
        }
      })
      .state('home.profile', {
        url: 'profile',
        templateUrl: 'artists/show.html',
        controller: 'ArtistController as ctrl',
        resolve: { //execute this code before the template is rendered
          artist: function (Auth, ArtistsService) {
            return ArtistsService.getArtist(Auth._currentUser.id); //load individual artist
          },
          sketches: function(Auth, ArtistsService) {
            return ArtistsService.getArtistSketches(Auth._currentUser.id); //load the sketches of the artist
          },
          user: function (Auth) {
            return Auth._currentUser;
          }
        },
        onEnter: function($state, Auth, $stateParams) {
          if (!Auth._currentUser) {
            $state.go('home');
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
        onEnter: function($state, Auth, $stateParams) {
          if (!Auth._currentUser) {
            $state.go('home');
          } else if ($stateParams.id != Auth._currentUser.id) { //check if artist id in path matches current user id
            $state.go('home');
          }
        }
      })
      .state('home.newSketch', {
        url: 'sketches/new',
        templateUrl: 'sketches/new.html',
        controller: 'NewSketchController as ctrl',
        resolve: { //execute this code before the template is rendered
          tags: function (TagsService) {
            return TagsService.getTags();
          }
        },
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
          },
          tags: function(TagsService) {
            return TagsService.getNonEmptyTags();
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
          },
          user: function (Auth) {
            return Auth._currentUser;
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
          },
          tags: function (TagsService) {
            return TagsService.getTags();
          }
        },
        onEnter: function($state, Auth, sketch) {
          if (!Auth._currentUser) {
            $state.go('home');
          } else if (sketch.data.user.id != Auth._currentUser.id) { //check if sketch's user id matches current user id
            $state.go('home');
          }
        }
      });

    $urlRouterProvider.otherwise('/'); //default route
});
