function EditArtistController(artist, $state, $stateParams, Auth, ArtistsService) { //artist is injected from app.js resolve
  var ctrl = this;

  ctrl.artist = artist.data;

  ctrl.updateArtist = function(){
    ArtistsService.updateArtist(ctrl.artist);
  }
}

angular
	.module('app')
	.controller('EditArtistController', EditArtistController);
