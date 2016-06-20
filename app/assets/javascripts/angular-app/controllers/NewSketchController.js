function NewSketchController($scope, Upload, $timeout, SketchesService, TagsService) {
  var ctrl = this;

  ctrl.sketch = {};

  ctrl.createSketch = function(){
    //SketchesService.createSketch(ctrl.sketch);

    var file = ctrl.picFile;

    file.upload = Upload.upload({
      url: '/sketches',
      method: 'POST',
      data: {
        sketch: { //structured to match rails strong params in sketches controller
          image: file,
          title: ctrl.sketch.title,
          description: ctrl.sketch.description//,
          //tags: []
        }
      }
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
      $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });

  }
}

angular
	.module('app')
	.controller('NewSketchController', NewSketchController);
