function HomeController($state) {
  var ctrl = this;
  ctrl.$state = $state;

  ctrl.home = function(){ //checks whether the current page is home
    return $state.current.name === 'home';
  }
}

angular
	.module('app')
	.controller('HomeController', HomeController);
