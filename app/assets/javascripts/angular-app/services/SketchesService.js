function SketchesService($http, $state, Upload, $timeout) {
  this.getSketches = function () { //get all the sketches from the serialized controller action
    return $http.get('/sketches.json');
  }

  this.getSketch = function(id) { //get the sketch by id from the serialized controller action
    return $http.get('/sketches/' + id + '.json');
  }

  this.createSketchWithForm = function(file, sketch, errorMsg) {
    file.upload = Upload.upload({
      url: '/sketches',
      method: 'POST',
      data: {
        sketch: { //structured to match rails strong params in sketches controller
          image: file,
          title: sketch.title,
          description: sketch.description//,
          //tags: []
        }
      }
    });

    file.upload.then(function (response) { //sucess
      $timeout(function () {
        file.result = response.data;
      });

      $state.go('home.sketch', { id: response.data.id }); //on success, rails controller sends back json data of the created sketch, then redirect based on that id
      //message?
    }, function (response) { //error
      if (response.status > 0)
      errorMsg = response.status + ': ' + response.data; //$scope.errorMsg - not sure if this works being in the service
    }, function (evt) { //progress
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
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
