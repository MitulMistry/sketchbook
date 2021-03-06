function AuthController($scope, $state, Auth, MessagesService) {
  var ctrl = this;

  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      MessagesService.success('Signed in successfully.');
      $state.go('home.profile');
      
    }, function(response) { //error
      MessagesService.displayError(response);
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function(){
      MessagesService.success('Signed up successfully.');
      $state.go('home.profile');
      
    }, function(response) { //error
      MessagesService.displayError(response);
    });
  };

}

AuthController.$inject = ['$scope', '$state', 'Auth', 'MessagesService']; //explicit dependency injection for Webpack JS minification

angular
	.module('app')
	.controller('AuthController', AuthController);
