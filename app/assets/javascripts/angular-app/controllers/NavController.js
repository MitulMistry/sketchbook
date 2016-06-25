function NavController($scope, $state, Auth, MessagesService) {
  var ctrl = this;

  $scope.signedIn = Auth.isAuthenticated; //used to check if user is signed in

  $scope.logout = function(){ //used to logout through this controller
    Auth.logout();
  }

  Auth.currentUser().then(function (user){
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
  });
}

angular
	.module('app')
	.controller('NavController', NavController);
