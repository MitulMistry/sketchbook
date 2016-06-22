function NewSketchController(tags, $scope, Upload, $timeout, SketchesService, TagsService) { //tags injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = {};
  ctrl.tags = tags.data;

  ctrl.createSketch = function(){
    SketchesService.createSketchWithForm(ctrl.picFile, ctrl.sketch, $scope.errorMsg);
  }
  
  ctrl.createTag = function(name){
    TagsService.createTag(name);
    console.log(ctrl.tags);
    TagsService.getTags().then(function(data){
      ctrl.tags = data;
    });
    console.log(ctrl.tags);
  }
}

angular
	.module('app')
	.controller('NewSketchController', NewSketchController);
