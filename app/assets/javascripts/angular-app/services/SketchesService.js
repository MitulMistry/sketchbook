function SketchesService($http, $state) {
  this.getSketches = function () { //get all the sketches from the serialized controller action
    return $http.get('/sketches.json');
  }

  this.getSketch = function(id) { //get the sketch by id from the serialized controller action
    return $http.get('/sketches/' + id + '.json');
  }

  this.createSketch = function(sketch) {
    var data = {
      sketch: { //rails strong params expects sketch model
        //user_id: Auth._currentUser.id,
        title: sketch.title,
        description: sketch.description//,
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

  this.deleteSketch = function(id) {
    $http({
      method: 'DELETE',
      url: '/sketches/' + id
    }).then(function successCallback(response) { //success
      $state.go('home');
      //message
    }, function errorCallback(response) { //error
      //message
    });
  }
}

angular
  .module('app')
  .service('SketchesService', SketchesService);
