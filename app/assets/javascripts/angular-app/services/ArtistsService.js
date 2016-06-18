function ArtistsService($http) {
  this.getArtists = function () { //get all the artists from the serialized controller action
    return $http.get('/artists.json');
  }

  this.getArtist = function(id) { //get the artist by id from the serialized controller action
    return $http.get('/artists/' + id + '.json');
  }

  this.updateArtist = function(artist) {
    var data = $.param({
      user: {
        id: artist.id,
        username: artist.username,
        first_name: artist.first_name,
        last_name: artist.last_name,
        bio: artist.bio
      }
    });
    //console.log(artist);
    $http.put('/artists/' + artist.id, data);
  }
}

angular
  .module('app')
  .service('ArtistsService', ArtistsService);
