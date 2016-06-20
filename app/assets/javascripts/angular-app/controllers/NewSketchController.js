function NewSketchController($scope, Upload, $timeout, SketchesService, TagsService) {
  var ctrl = this;

  ctrl.sketch = {};

  ctrl.createSketch = function(){
    SketchesService.createSketchWithForm(ctrl.picFile, ctrl.sketch, $scope.errorMsg);
  }
}

angular
	.module('app')
	.controller('NewSketchController', NewSketchController);
