function EditSketchController(sketch, $state, $stateParams, Auth) { //sketch is injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = sketch.data;

  ctrl.updateSketch = function(){

  }
}

angular
	.module('app')
	.controller('EditSketchController', EditSketchController);
