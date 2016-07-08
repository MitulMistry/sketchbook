function TagsService($http, $state, MessagesService, Auth) {
  
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
    if (Auth.isAuthenticated()) {
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
    } else {
      MessagesService.danger('You do not have permissions.');
      $state.go('home');
    }
  }
}

angular
  .module('app')
  .service('TagsService', TagsService);
