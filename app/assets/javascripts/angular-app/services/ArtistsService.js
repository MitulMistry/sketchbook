function ArtistsService($http, $state, $stateParams) {
  this.getArtists = function () { //get all the artists from the serialized controller action
    return $http.get('/artists.json');
  }

  this.getArtist = function(id) { //get the artist by id from the serialized controller action
    return $http.get('/artists/' + id + '.json');
  }

  this.getArtistSketches = function(artist_id) {
    return $http.get('/artists/' + artist_id + '/sketches' + '.json');
  }

  this.updateArtist = function(artist) {
    var data = {
      user: { //rails strong params expects user model
        id: artist.id,
        username: artist.username,
        first_name: artist.first_name,
        last_name: artist.last_name,
        bio: artist.bio
      }
    };

    $http({
      method: 'PUT',
      dataType: 'json',
      url: '/artists/' + artist.id,
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function successCallback(response) { //success
      $state.go('home.artist', {id: $stateParams.id }); //go back to profile page
      //message
    }, function errorCallback(response) { //error
      //message
    });

  }
}

angular
  .module('app')
  .service('ArtistsService', ArtistsService);
