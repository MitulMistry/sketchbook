function EditSketchController(sketch, tags, $state, $stateParams, Auth, SketchesService, TagsService) { //sketch and tags is injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = sketch.data;
  ctrl.tags = tags.data;
  
  //sketch.tags comes as an array of tag objects, but for the checklist-model they need to be an array of ids
  ctrl.sketch.tags = ctrl.sketch.tags.map(function(tag) {
    return tag.id;
  });

  ctrl.updateSketch = function(){
    //console.log(ctrl.sketch);
  }
}

angular
	.module('app')
	.controller('EditSketchController', EditSketchController);
