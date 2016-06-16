function SketchesController(sketches) { //sketches is injected from app.js resolve
  var ctrl = this;

  ctrl.sketches = sketches;
}

angular
	.module('app')
	.controller('SketchesController', SketchesController);
