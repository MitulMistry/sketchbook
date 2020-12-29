function SketchController(sketch, user, SketchesService) { //sketch and user are injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = sketch.data;
  console.log(sketch);
  //ctrl.data = sketch.data;

  ctrl.ifOwner = function() {
    if (user == null) {
      return false;
    } else {
      return (ctrl.sketch.user.id === user.id);
    }
  }

  ctrl.deleteSketch = function() {
    //check, are you sure? then send delete request
    if (confirm('Are you sure?') && ctrl.ifOwner()) {
      SketchesService.deleteSketch(ctrl.sketch);
    }
  }
}

SketchController.$inject = ['sketch', 'user', 'SketchesService']; //explicit dependency injection for Webpack JS minification

angular
	.module('app')
	.controller('SketchController', SketchController);
