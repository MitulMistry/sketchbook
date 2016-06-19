function ArtistController(artist, user, sketches) { //artist, user, and sketches are injected from app.js resolve
  var ctrl = this;

  ctrl.artist = artist.data;
  //ctrl.data = artist.data;
  ctrl.sketches = sketches.data;
  //console.log(ctrl.sketches);

  ctrl.ifOwner = function() {
    if (user == null) {
      return false;
    } else {
      return (ctrl.artist.id === user.id);
    }
  }
}

angular
	.module('app')
	.controller('ArtistController', ArtistController);
