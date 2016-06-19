function SketchController(sketch, user) { //sketch and user are injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = sketch.data;
  //ctrl.data = sketch.data;

  ctrl.ifOwner = function() {
    if (user == null) {
      return false;
    } else {
      return (ctrl.sketch.user.id === user.id);
    }
  }

  ctrl.deleteSketch = function() {
    alert('Implement delete sketch');
    //check, are you sure? then send delete request
  }
}

angular
	.module('app')
	.controller('SketchController', SketchController);
