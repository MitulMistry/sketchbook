function TagsService($http) {
  
  this.getTags = function () { //get all the tags from the serialized controller action
    return $http.get('/tags.json');
  }
  
  this.getNonEmptyTags = function () { //get only the tags that have sketches associated with them
    return $http.get('/tags/non_empty.json');
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

    return $http({
      method: 'POST',
      dataType: 'json',
      url: '/tags',
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

angular
  .module('app')
  .service('TagsService', TagsService);
