function TagsService($http) {
  this.getTags = function () { //get all the tags from the serialized controller action
    return $http.get('/tags.json');
  }

  this.getTag = function(id) { //get the tag by id from the serialized controller action
    return $http.get('/tags/' + id + '.json');
  }

  this.createTag = function(name) {
    var data = {
      tag: { //rails strong params expects tag model
        name: name
      }
    };

    $http({
      method: 'POST',
      dataType: 'json',
      url: '/tags',
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    })/*.then(function successCallback(response) { //success
      return response;
      //message
    }, function errorCallback(response) { //error
      //return response;
      //message
    })*/;
  }
}

angular
  .module('app')
  .service('TagsService', TagsService);
