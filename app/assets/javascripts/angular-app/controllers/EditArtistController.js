function EditArtistController(artist, $state, $stateParams, Auth) { //artist is injected from app.js resolve
  var ctrl = this;

  ctrl.artist = artist.data;

  ctrl.updateArtist = function(){

  }
}

angular
	.module('app')
	.controller('EditArtistController', EditArtistController);
