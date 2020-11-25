function NewSketchController(tags, $scope, Upload, $timeout, SketchesService, TagsService) { //tags injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = {};
  ctrl.tags = tags.data;
  
  ctrl.createSketch = function(){
    SketchesService.createSketchWithForm(ctrl.picFile, ctrl.sketch, $scope.errorMsg);
  }
  
  ctrl.createTag = function(){ //duplicate in EditSketchController
    TagsService.createTag(ctrl.newTagName).then(function(response){
      var newTag = response.data; //gets the new tag as a response from controller create action
      ctrl.tags.push(newTag); //add the new tag to the tags so a checkbox is created
      
      if (!ctrl.sketch.tags) ctrl.sketch.tags = []; //if the sketches tags are null (empty), create an empty array so you can push
      
      ctrl.sketch.tags.push(newTag.id); //add the new tag id onto the sketch's tags so it can be automatically checked in checklist-model
    
      ctrl.newTagName = ''; //clear form
    });
  }
}

angular
	.module('app')
	.controller('NewSketchController', NewSketchController);
