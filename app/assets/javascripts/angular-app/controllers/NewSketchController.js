function NewSketchController($scope, Upload, $timeout, SketchesService, TagsService, tags) { //tags injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = {};
  ctrl.tags = tags.data;

  ctrl.createSketch = function(){
    SketchesService.createSketchWithForm(ctrl.picFile, ctrl.sketch, $scope.errorMsg);
  }
}

angular
	.module('app')
	.controller('NewSketchController', NewSketchController);
