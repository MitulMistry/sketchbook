function ArtistController(artist, user, sketches) { //artist, user, and sketches are injected from app.js resolve
  var ctrl = this;

  ctrl.artist = artist.data;
  ctrl.sketches = sketches.data;
  
  ctrl.pageSize = 6;

  ctrl.ifOwner = function() {
    if (user == null) {
      return false;
    } else {
      return (ctrl.artist.id === user.id);
    }
  }
}

ArtistController.$inject = ['artist', 'user', 'sketches']; //explicit dependency injection for Webpack JS minification

angular
	.module('app')
	.controller('ArtistController', ArtistController);
