function NewSketchController($http, $state, $stateParams, Auth, SketchesService, TagsService) {
  var ctrl = this;

  ctrl.sketch = {};

  ctrl.createSketch = function(){
    SketchesService.createSketch(ctrl.sketch);
  }
}

angular
	.module('app')
	.controller('NewSketchController', NewSketchController);
