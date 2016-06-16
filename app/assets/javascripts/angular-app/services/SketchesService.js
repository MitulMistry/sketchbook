function SketchesService($http) {
  this.getSketches = function () { //get all the sketches from the serialized controller action
    return $http.get('/sketches.json');
  }

  this.getSketch = function(id) { //get the sketch by id from the serialized controller action
    return $http.get('/sketches/' + id + '.json');
  }
}

angular
  .module('app')
  .service('SketchesService', SketchesService);
