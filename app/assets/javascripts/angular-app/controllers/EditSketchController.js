function EditSketchController(sketch, tags, $state, $stateParams, Auth, SketchesService, TagsService) { //sketch and tags is injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = sketch.data;
  ctrl.tags = tags.data;

  ctrl.updateSketch = function(){
    
  }
}

angular
	.module('app')
	.controller('EditSketchController', EditSketchController);
