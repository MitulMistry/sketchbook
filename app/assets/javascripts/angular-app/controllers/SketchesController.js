function SketchesController(sketches, tags) { //sketches and tags are injected from app.js resolve
  var ctrl = this;

  ctrl.sketches = sketches.data;
  ctrl.tags = tags.data;
}

angular
	.module('app')
	.controller('SketchesController', SketchesController);
