function NavController($scope, $state, Auth, MessagesService, $window) {
  var ctrl = this;

  $scope.signedIn = Auth.isAuthenticated; //used to check if user is signed in

  $scope.logout = function(){ //used to logout through this controller
    Auth.logout();
  }

  //this occurs on a hard page reload, or visiting site for first time
  Auth.currentUser().then(function (user){ //promise results in a 401 error in console if not logged in, but not really a problem
    $scope.user = user;
  });

  $scope.$on('devise:new-registration', function (event, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (event, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (event, user){
    $scope.user = {};
    MessagesService.success('Signed out successfully.');
    $state.go('home');
    $window.location.reload(); //hard reload - temporary fix for csrf - authenticity token problem if logging in again or registering after logging out
  });
}

angular
	.module('app')
	.controller('NavController', NavController);
