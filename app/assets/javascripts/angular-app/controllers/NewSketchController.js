function NewSketchController($scope, Upload, $timeout, SketchesService, TagsService) {
  var ctrl = this;

  ctrl.sketch = {};

  ctrl.createSketch = function(){
    //SketchesService.createSketch(ctrl.sketch);

    var file = ctrl.picFile;

    file.upload = Upload.upload({
      url: '/sketches',
      method: 'POST',
      fields: {
        'sketch[title]': ctrl.sketch.title,
        'sketch[description]': ctrl.sketch.description//,
        //'sketch[tags]: []
      },
      file: file,
      fileFormDataName: 'sketch[image]'

      //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      //data: {username: $scope.username, file: file},
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
