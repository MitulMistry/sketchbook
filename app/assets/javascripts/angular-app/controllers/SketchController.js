function SketchController(sketch, user) { //sketch and user are injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = sketch.data;
  //ctrl.data = sketch.data;

  ctrl.ifOwner = function() {
    return (ctrl.sketch.user.id == user.id);
  }
}

angular
	.module('app')
	.controller('SketchController', SketchController);
