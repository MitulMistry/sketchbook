function SketchesService($http, $state, Upload, $timeout, MessagesService, Auth) {
  
  this.getSketches = function () { //get all the sketches from the serialized controller action
    return $http.get('/sketches.json');
  }

  this.getSketch = function(id) { //get the sketch by id from the serialized controller action
    return $http.get('/sketches/' + id + '.json');
  }

  this.createSketchWithForm = function(file, sketch, errorMsg) {
    if (Auth.isAuthenticated()) { //check ownership
      file.upload = Upload.upload({
        url: '/sketches',
        method: 'POST',
        data: {
          sketch: { //structured to match rails strong params in sketches controller
            image: file,
            title: sketch.title,
            description: sketch.description,
            tag_ids: sketch.tags //this sends data as "tag_ids"=>{"0"=>"2", "1"=>"4"} when it should be "tag_ids"=>["2", "4"] - for now implemented back end solution to check format in rails sketches_controller
            //JSON.stringify(sketch.tags) //"tag_ids[]": [1,2]//angular.toJson(tags) //angular.toJson(sketch.tags) //sketch.tags
          }
        }
      });
  
      file.upload.then(function (response) { //sucess
        $timeout(function () {
          file.result = response.data;
        });
  
        $state.go('home.sketch', { id: response.data.id }); //on success, rails controller sends back json data of the created sketch, then redirect based on that id
        MessagesService.success('Sketch created.');
        
      }, function (response) { //error
        if (response.status > 0)
        errorMsg = response.status + ': ' + response.data; //$scope.errorMsg - not sure if this works being in the service
        MessagesService.displayError(response);
      }, function (evt) { //progress
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    } else {
      MessagesService.danger('You do not have permissions.');
      $state.go('home');
    }
  }
  
  this.updateSketchWithForm = function(file, sketch, errorMsg) {
    if (sketch.user.id === Auth._currentUser.id) { //check ownership
      var data = {
        'sketch': { //structured to match rails strong params in sketches controller
        description: sketch.description, //description is optional, so okay if it's empty
        tag_ids: sketch.tags
        }
      };
      
      if (sketch.title) data.sketch.title = sketch.title; //only update title if there's something to update with

      if (file) {
        data.sketch.image = file;
        
        file.upload = Upload.upload({
          url: '/sketches/' + sketch.id,
          method: 'PUT',
          data: data
        });
    
        file.upload.then(function (response) { //sucess
          $timeout(function () {
            file.result = response.data;
          });
    
          $state.go('home.sketch', { id: response.data.id }); //on success, rails controller sends back json data of the created sketch, then redirect based on that id
          MessagesService.success('Sketch updated.');
          
        }, function (response) { //error
          if (response.status > 0)
          errorMsg = response.status + ': ' + response.data; //$scope.errorMsg - not sure if this works being in the service
          MessagesService.displayError(response);
        }, function (evt) { //progress
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
        
      } else { //if there's no file, then use standard $http request
        
        $http({ //return
          method: 'PUT',
          dataType: 'json',
          url: '/sketches/' + sketch.id,
          data: data,
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function(response) {
          $state.go('home.sketch', { id: response.data.id }); //on success, rails controller sends back json data of the created sketch, then redirect based on that id
          MessagesService.success('Sketch updated.');
        }, function (response) { //error
          MessagesService.displayError(response);
        });
        
      }
    } else {
      MessagesService.danger('You do not have permissions.');
      $state.go('home');
    }
  }

  this.deleteSketch = function(sketch) {
    if (sketch.user.id === Auth._currentUser.id) { //check ownership
      $http({
        method: 'DELETE',
        url: '/sketches/' + sketch.id
      }).then(function(response) { //success
        $state.go('home');
        MessagesService.success('Sketch deleted.');
      });
    } else {
      MessagesService.danger('You do not have permissions.');
      $state.go('home');
    }
  }
}

angular
  .module('app')
  .service('SketchesService', SketchesService);
