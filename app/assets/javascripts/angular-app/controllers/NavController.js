function NavController($scope, $state, Auth) { //Message
  var ctrl = this;

  $scope.signedIn = Auth.isAuthenticated; //used to check if user is signed in

  $scope.logout = function(){ //used to logout through this controller
    Auth.logout();
  }

}

angular
	.module('app')
	.controller('NavController', NavController);
