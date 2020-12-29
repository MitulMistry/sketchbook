function HomeController($state, homeSketches) { //sketches are injected from app.js resolve
  var ctrl = this;
  ctrl.homeSketches = homeSketches.data;
  ctrl.$state = $state;
  ctrl.date = new Date();

  ctrl.home = function(){ //checks whether the current page is home
    return $state.current.name === 'home';
  }
}

HomeController.$inject = ['$state', 'homeSketches']; //explicit dependency injection for Webpack JS minification

angular
	.module('app')
	.controller('HomeController', HomeController);
