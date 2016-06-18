function ArtistController(artist, user, Auth) { //artist and user are injected from app.js resolve
  var ctrl = this;

  ctrl.artist = artist.data;
  //ctrl.data = artist.data;

  ctrl.ifOwner = function() {
    return (ctrl.artist.id == user.id);
  }
}

angular
	.module('app')
	.controller('ArtistController', ArtistController);
