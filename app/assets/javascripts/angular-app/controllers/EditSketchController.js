function EditSketchController(sketch, tags, $scope, Upload, $timeout, SketchesService, TagsService) { //sketch and tags is injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = sketch.data;
  ctrl.tags = tags.data;
  
  //sketch.tags comes as an array of tag objects, but for the checklist-model they need to be an array of ids
  ctrl.sketch.tags = ctrl.sketch.tags.map(function(tag) {
    return tag.id;
  });

  ctrl.updateSketch = function(){
    SketchesService.updateSketchWithForm(ctrl.picFile, ctrl.sketch, $scope.errorMsg);
  }
  
  ctrl.createTag = function(){ //duplicate in NewSketchController
    TagsService.createTag(ctrl.newTagName).then(function(response){
      var newTag = response.data; //gets the new tag as a response from controller create action
      ctrl.tags.push(newTag); //add the new tag to the tags so a checkbox is created
      
      if (!ctrl.sketch.tags) ctrl.sketch.tags = []; //if the sketches tags are null (empty), create an empty array so you can push
      
      ctrl.sketch.tags.push(newTag.id); //add the new tag id onto the sketch's tags so it can be automatically checked in checklist-model
      
      ctrl.newTagName = '';//clear form
    });
  }
}

angular
	.module('app')
	.controller('EditSketchController', EditSketchController);
