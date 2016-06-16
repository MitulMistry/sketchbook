function ArtistsService($http) {
  this.getArtists = function () { //get all the artists from the serialized controller action
    return $http.get('/artists.json');
  }

  this.getArtist = function(id) { //get the artist by id from the serialized controller action
    return $http.get('/artists/' + id + '.json');
  }
}

angular
  .module('app')
  .service('ArtistsService', ArtistsService);
