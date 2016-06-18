function ArtistsService($http) {
  this.getArtists = function () { //get all the artists from the serialized controller action
    return $http.get('/artists.json');
  }

  this.getArtist = function(id) { //get the artist by id from the serialized controller action
    return $http.get('/artists/' + id + '.json');
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
    });

    //var data = {user: artist};
    /*
    $http({
      method: 'PUT',
      url: '/artists/' + artist.id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: data
    });
    */

    /*
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
    */
  }
}

angular
  .module('app')
  .service('ArtistsService', ArtistsService);
