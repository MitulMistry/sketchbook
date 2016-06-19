function NewSketchController($http, $state, $stateParams, Auth) {
  var ctrl = this;

  ctrl.sketch = {};

  ctrl.createSketch = function(){
    //console.log(ctrl.sketch);

    var data = {
      sketch: { //rails strong params expects sketch model
        //user_id: Auth._currentUser.id,
        title: ctrl.sketch.title,
        description: ctrl.sketch.description//,
        //tags: [],
        //image:
      }
    };

    $http({
      method: 'POST',
      dataType: 'json',
      url: '/sketches',
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function successCallback(response) { //success
      $state.go('home.sketch', {id: response.data.id }); //go to created sketch
      //message
    }, function errorCallback(response) { //error
      //message
    });
  }
}

angular
	.module('app')
	.controller('NewSketchController', NewSketchController);
