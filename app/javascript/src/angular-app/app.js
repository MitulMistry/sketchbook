//Angular dependency imports
import angular from 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-bootstrap';
import 'AngularDevise';
import 'angular-messages';
import 'angular-flash-alert';
import 'ng-file-upload';
import 'checklist-model';
import 'angular-utils-pagination';
import 'angular-sticky-footer/angular-sticky-footer.js';

//Template imports
import homeTemplate from '../templates/home.html';
import authLoginTemplate from '../templates/auth/login.html';
import authRegisterTemplate from '../templates/auth/register.html';
import artistsIndexTemplate from '../templates/artists/index.html';
import artistsShowTemplate from '../templates/artists/show.html';
import artistsEditTemplate from '../templates/artists/edit.html';
import sketchesNewTemplate from '../templates/sketches/new.html';
import sketchesIndexTemplate from '../templates/sketches/index.html';
import sketchesShowTemplate from '../templates/sketches/show.html';
import sketchesEditTemplate from '../templates/sketches/edit.html';
import sketchesFormTemplate from '../templates/sketches/_form.html';
import formMessagesTemplate from '../templates/messages.html';

angular
  .module('app', [ //define module and include dependencies
    'ui.router', //for routing
    // 'templates', //use angular-rails-templates gem to include html templates in the Rails asset pipeline for Angular
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
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', { //create a ui-router state
        url: '/', //set url route
        template: homeTemplate, //set template  - can also do require('../templates/home.html')
        controller: 'HomeController as ctrl', //set controller for this route (equavelent of using <ng-controller="..."> in template)
        resolve: { //execute this code before the template is rendered
          homeSketches: ['SketchesService', function (SketchesService) { //set sketches equal to SketchesService.getSketches() to be used in the template
            return SketchesService.getRandomSketches();
          }]
        }
      })
      .state('home.login', { //home.login uses home.html and inserts login template into the <ui-view>
        url: 'login',
        template: authLoginTemplate,
        controller: 'AuthController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          if (Auth._currentUser) { //if already logged in, redirect - uses angular devise
            Auth.currentUser().then(function (){
              $state.go('home.sketches');
            });
          }
        }]
      })
      .state('home.register', {
        url: 'register',
        template: authRegisterTemplate,
        controller: 'AuthController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          if (Auth._currentUser) { //if already logged in, redirect
            Auth.currentUser().then(function (){
              $state.go('home.sketches');
            });
          }
        }]
      })
      .state('home.artists', {
        url: 'artists',
        template: artistsIndexTemplate,
        controller: 'ArtistsController as ctrl',
        resolve: { //execute this code before the template is rendered
          artists: ['ArtistsService', function (ArtistsService) { //set artists equal to ArtistsService.getArtists() to be used in the template
            return ArtistsService.getArtists();
          }]
        }
      })
      .state('home.artist', {
        url: 'artists/:id',
        template: artistsShowTemplate,
        controller: 'ArtistController as ctrl',
        resolve: { //execute this code before the template is rendered
          artist: ['$stateParams', 'ArtistsService', function ($stateParams, ArtistsService) {
            return ArtistsService.getArtist($stateParams.id); //load individual artist
          }],
          sketches: ['$stateParams', 'ArtistsService', function($stateParams, ArtistsService) {
            return ArtistsService.getArtistSketches($stateParams.id); //load the sketches of the artist
          }],
          user: ['Auth', function (Auth) {
            return Auth._currentUser;
          }]
        }
      })
      .state('home.profile', {
        url: 'profile',
        template: artistsShowTemplate,
        controller: 'ArtistController as ctrl',
        resolve: { //execute this code before the template is rendered
          artist: ['Auth', 'ArtistsService', function (Auth, ArtistsService) {
            return ArtistsService.getArtist(Auth._currentUser.id); //load individual artist
          }],
          sketches: ['Auth', 'ArtistsService', function(Auth, ArtistsService) {
            return ArtistsService.getArtistSketches(Auth._currentUser.id); //load the sketches of the artist
          }],
          user: ['Auth', function (Auth) {
            return Auth._currentUser;
          }]
        },
        onEnter: ['$state', 'Auth', '$stateParams', function($state, Auth, $stateParams) {
          if (!Auth._currentUser) {
            $state.go('home');
          }
        }]
      })
      .state('home.editArtist', {
        url: 'artists/:id/edit',
        template: artistsEditTemplate,
        controller: 'EditArtistController as ctrl',
        resolve: { //execute this code before the template is rendered
          artist: ['$stateParams', 'ArtistsService', function ($stateParams, ArtistsService) {
            return ArtistsService.getArtist($stateParams.id); //load individual artist
          }]
        },
        onEnter: ['$state', 'Auth', '$stateParams', function($state, Auth, $stateParams) {
          if (!Auth._currentUser) {
            $state.go('home');
          } else if ($stateParams.id != Auth._currentUser.id) { //check if artist id in path matches current user id
            $state.go('home');
          }
        }]
      })
      .state('home.newSketch', {
        url: 'sketches/new',
        template: sketchesNewTemplate,
        controller: 'NewSketchController as ctrl',
        resolve: { //execute this code before the template is rendered
          tags: ['TagsService', function (TagsService) {
            return TagsService.getTags();
          }]
        },
        onEnter: ['$state', 'Auth', function($state, Auth) {
          if (!Auth._currentUser) { //if not logged in, redirect
            $state.go('home');
          }
        }]
      })
      .state('home.sketches', {
        url: 'sketches',
        template: sketchesIndexTemplate,
        controller: 'SketchesController as ctrl',
        resolve: { //execute this code before the template is rendered
          sketches: ['SketchesService', function (SketchesService) { //set sketches equal to SketchesService.getSketches() to be used in the template
            return SketchesService.getSketches();
          }],
          tags: ['TagsService', function(TagsService) {
            return TagsService.getNonEmptyTags();
          }]
        }
      })
      .state('home.sketch', {
        url: 'sketches/:id',
        template: sketchesShowTemplate,
        controller: 'SketchController as ctrl',
        resolve: { //execute this code before the template is rendered
          sketch: ['$stateParams', 'SketchesService', function ($stateParams, SketchesService) {
            return SketchesService.getSketch($stateParams.id); //load individual sketch
          }],
          user: ['Auth', function (Auth) {
            return Auth._currentUser;
          }]
        }
      })
      .state('home.editSketch', {
        url: 'sketches/:id/edit',
        template: sketchesEditTemplate,
        controller: 'EditSketchController as ctrl',
        resolve: { //execute this code before the template is rendered
          sketch: ['$stateParams', 'SketchesService', function ($stateParams, SketchesService) {
            return SketchesService.getSketch($stateParams.id); //load individual sketch
          }],
          tags: ['TagsService', function (TagsService) {
            return TagsService.getTags();
          }]
        },
        onEnter: ['$state', 'Auth', 'sketch', function($state, Auth, sketch) {
          if (!Auth._currentUser) {
            $state.go('home');
          } else if (sketch.data.user.id != Auth._currentUser.id) { //check if sketch's user id matches current user id
            $state.go('home');
          }
        }]
      });

    $urlRouterProvider.otherwise('/'); //default route
  }])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('sketches/_form.html', sketchesFormTemplate); //store form in template cache so it can be used with ng-include
    $templateCache.put('messages.html', formMessagesTemplate); //store messages in template cache so it can be used with ng-messages-include
  }]);
