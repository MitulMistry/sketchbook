function NewSketchController(tags, $scope, Upload, $timeout, SketchesService, TagsService) { //tags injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = {};
  ctrl.tags = tags.data;

  ctrl.createSketch = function(){
    SketchesService.createSketchWithForm(ctrl.picFile, ctrl.sketch, $scope.errorMsg);
  }
  
  ctrl.createTag = function(name){
    TagsService.createTag(name).then(function(response){
      //console.log(response);
      //ctrl.tags.push(response.id);
    });
    
    
    TagsService.getTags().then(function(response){
      ctrl.tags = response.data;
    });
  }
}

angular
	.module('app')
	.controller('NewSketchController', NewSketchController);
