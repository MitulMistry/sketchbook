function SketchController(sketch) { //sketch is injected from app.js resolve
  var ctrl = this;

  ctrl.sketch = sketch;
  //ctrl.data = sketch.data;
}

angular
	.module('app')
	.controller('SketchController', SketchController);
