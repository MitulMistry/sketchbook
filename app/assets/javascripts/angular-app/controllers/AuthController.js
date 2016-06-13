function AuthController($scope, $state, Auth) { //Message
  var ctrl = this;

  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      //Message.success('Signed in.')
      $state.go('home.sketches')
    }, function(response) {
      //Message.danger(response.data.error);
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function(){
      //Message.success('Signed up successfully.');
      $state.go('home.sketches')
    }, function(response) {
      //var errors = Message.processErrors(response.data.errors)
      //Message.danger(errors)
    });
  };

}

angular
	.module('app')
	.controller('AuthController', AuthController);
